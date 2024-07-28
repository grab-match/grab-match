import { DeleteDateColumn, UpdateDateColumn, ValueTransformer } from "typeorm";
import { BaseCreate } from "./base-create.entity";

export class Base extends BaseCreate {

    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at'
    })
    updated_at: Date;

    @DeleteDateColumn({
        type: 'timestamptz',
        name: 'deleted_at',
        select: false,
    })
    deleted_at: Date;
}