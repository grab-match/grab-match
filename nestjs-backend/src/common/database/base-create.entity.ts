import { BaseEntity, CreateDateColumn, Generated, PrimaryColumn, ValueTransformer } from "typeorm";

export const bigint: ValueTransformer = {
    to: (entityValue: number) => entityValue,
    from: (databaseValue: string): number => Number(databaseValue)
}

export class BaseCreate extends BaseEntity {

    @Generated('increment')
    @PrimaryColumn('bigint', {
        transformer: bigint,
    })
    id: number;

    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at'
    })
    created_at: Date;
}