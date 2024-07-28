import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../../../common/database/base.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Entity('generated_destinations')
export class GeneratedDestinationsEntity extends Base {

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'actor_id' })
    actor: UserEntity;

    @Column({ select: false })
    actor_id: number

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