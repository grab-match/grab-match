import { Module } from '@nestjs/common';
import { DestinationsService } from './services/destinations.service';
import { DestinationsController } from './destinations.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageDestinationEntity } from './entities/package-destination.entity';
import { GeneratedDestinationsEntity } from './entities/generated-destinations.entity';

@Module({
  controllers: [DestinationsController],
  providers: [DestinationsService],
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      PackageDestinationEntity,
      GeneratedDestinationsEntity,
    ]),
  ]
})
export class DestinationsModule { }
