import { DestinationPackages } from '../src/modules/destinations/packages/destination.packages';
import { PackageDestinationEntity } from '../src/modules/destinations/entities/package-destination.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class SeedPackages1722116484445 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const packageRepository = dataSource.getRepository(PackageDestinationEntity);
        await packageRepository.upsert([
            DestinationPackages.kotuPackages,
            DestinationPackages.scbdPackages,
        ], ['slug']);
    }
}
