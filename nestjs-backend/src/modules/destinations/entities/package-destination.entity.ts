import { Column, Entity, Index } from "typeorm";
import { Base } from "../../../common/database/base.entity";

@Entity('package_destinations')
@Index(['slug'], { unique: true })
export class PackageDestinationEntity extends Base {

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    start_time: string;

    @Column()
    end_time: string;

    @Column()
    duration: string;

    @Column({
        type: 'jsonb',
    })
    itenary_ids: string[];
}