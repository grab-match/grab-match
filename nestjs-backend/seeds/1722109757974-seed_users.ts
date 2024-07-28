import { EnvHelper } from '../src/common/helper/env/env.helper';
import { UserEntity } from '../src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class SeedUsers1722109757974 implements Seeder {
    track = true;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        if (EnvHelper.isProduction()) {
            return;
        }

        const userFactories = factoryManager.get(UserEntity);
        await userFactories.saveMany(50);
    }
}
