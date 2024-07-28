import { Injectable, NotFoundException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { EsIndexConstant } from 'src/common/constant/es.index.constant';
import { GetDestinationDto } from '../dto/get-destinations.dto';
import axios from 'axios';
import { Sort } from '@elastic/elasticsearch/lib/api/types';
import { PackageDestinationEntity } from '../entities/package-destination.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneratedDestinationsEntity } from '../entities/generated-destinations.entity';
import { randomInt } from 'crypto';

@Injectable()
export class DestinationsService {

  constructor(
    private readonly esService: ElasticsearchService,
    @InjectRepository(PackageDestinationEntity) private readonly packageRepository: Repository<PackageDestinationEntity>,
    @InjectRepository(GeneratedDestinationsEntity) private readonly generatedDestinationsRepository: Repository<GeneratedDestinationsEntity>,
  ) { }

  async findAll(dto: GetDestinationDto, user) {
    const nearbyDestinations = await this.getNearbyDestinations(dto);

    const llmData = await this.getRecommendationFromLLM(dto, nearbyDestinations);
    const generatedDestination = await this.generatedDestinationsRepository.save({
      actor_id: user.id,
      ...llmData,
      itenary_ids: llmData.itineraries.map((itinerary) => itinerary.cid),
    });

    const itineraries = await this.getByItenaries(llmData.itineraries);

    return {
      id: generatedDestination.id,
      ...llmData,
      itineraries: itineraries,
    }
  }

  private async getRecommendationFromLLM(dto: GetDestinationDto, nearbyDestinations, retry = 0) {
    let data;

    try {
      const response = await axios.post(`${process.env.LLM_API_URL}/llm/destinations`, {
        data: nearbyDestinations,
        start_time: dto.start_time,
        duration: dto.duration,
        latitude: dto.latitude,
        longitude: dto.longitude,
      });
      data = response.data;
    } catch (error) {
      console.error('Error when calling LLM', error, retry);
      if (retry >= 3) {
        throw new Error('Failed to get recommendation from LLM');
      } else {
        return this.getRecommendationFromLLM(dto, nearbyDestinations, retry + 1);
      }
    }

    return data;
  }

  private async getByItenaries(itenaries: any[]) {
    const response = await this.esService.search({
      index: EsIndexConstant.ES_DESTINATION_INDEX,
      body: {
        query: {
          ids: {
            values: itenaries.map((itinerary) => itinerary.cid),
          },
        },
      },
    });

    return response.hits.hits.map((hit, index) => {
      const source: any = hit._source;

      return {
        ...source,
        start_time: itenaries[index].start_time,
        end_time: itenaries[index].end_time,
      }
    });
  }

  private async getNearbyDestinations(dto: GetDestinationDto) {
    const geoDistanceFilter = {
      geo_distance: {
        distance: '10km',
        location: {
          lat: dto.latitude,
          lon: dto.longitude,
        },
      },
    };
    const sort: Sort = [
      {
        _geo_distance: {
          location: {
            lat: dto.latitude,
            lon: dto.longitude,
          },
          order: 'asc',
          unit: 'km',
          mode: 'min',
          distance_type: 'arc',
        },
      },
      {
        _script: {
          type: 'number',
          script: {
            lang: 'painless',
            source: 'doc["review_count"].value * doc["review_rating"].value',
          },
          order: 'desc',
        },
      },
    ];

    // order by rating from review_count and review_rating than order by distance give score 1
    const destinationBuilder = await this.esService.search({
      index: EsIndexConstant.ES_DESTINATION_INDEX,
      body: {
        size: 3,
        query: {
          bool: {
            must: [
              geoDistanceFilter,
              {
                bool: {
                  must_not: {
                    match: {
                      categories: 'restaurant',
                    },
                  },
                },
              },
            ],
          },
        },
        sort: sort,
      }
    });
    const destinations = destinationBuilder.hits.hits.map((hit) => hit._source);

    // get restaurants data from same index where categories is include 'restaurant' or 'xxx restaurant'
    const restaurantBuilder = await this.esService.search({
      index: EsIndexConstant.ES_DESTINATION_INDEX,
      body: {
        size: 1,
        query: {
          bool: {
            must: [
              geoDistanceFilter,
              {
                match: {
                  categories: 'restaurant',
                },
              },
            ],
          },
        },
        sort: sort,
      }
    });
    const restaurants = restaurantBuilder.hits.hits.map((hit) => hit._source);
    return [...restaurants, ...destinations];
  }

  async findOne(id: string) {
    const builder = await this.esService.search({
      index: EsIndexConstant.ES_DESTINATION_INDEX,
      body: {
        query: {
          match: {
            _id: id,
          },
        },
      },
    });

    if (builder.hits.hits.length === 0) {
      throw new NotFoundException('Destination not found');
    }

    return builder.hits.hits[0]._source;
  }

  async getPackages() {
    const packages = await this.packageRepository.find();
    return packages;
  }

  async getByIds(ids: string[]) {
    const builder = await this.esService.search({
      index: EsIndexConstant.ES_DESTINATION_INDEX,
      body: {
        query: {
          ids: {
            values: ids,
          },
        },
      },
    });

    return builder.hits.hits.map((hit) => hit._source);
  }

  async getPackage(slug: string) {
    const packages = await this.packageRepository.findOneBy({ slug });
    const itineraries = await this.getByIds(packages.itenary_ids);

    return {
      ...packages,
      itineraries: itineraries,
    }
  }

  async getGeneratedById(id: number) {
    const generatedDestination = await this.generatedDestinationsRepository.findOneBy({ id });
    if (!generatedDestination) {
      throw new NotFoundException('Generated destination not found');
    }

    const price = generatedDestination.itenary_ids.length * 100_000 + randomInt(50_000, 100_000);

    return {
      ...generatedDestination,
      cars: [
        {
          name: 'Normal car',
          price,
        },
        {
          name: 'Premium car',
          price: price * 1.8,
        },
        {
          name: 'Deluxe car',
          price: price * 2.5,
        },
      ],
    }
  }
}
