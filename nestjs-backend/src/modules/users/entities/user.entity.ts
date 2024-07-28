import { Column, Entity, Index } from "typeorm";
import { Base } from "../../../common/database/base.entity";
import { USER_EMAIL_UNIQUE_INDEX } from "src/common/constant/db-index.key.constant";
import { UserRole } from "../enums/user-role.enum";

@Entity({
    name: 'users',
})
export class UserEntity extends Base {

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }

    @Column()
    name: string;

    @Column({ unique: true })
    @Index(USER_EMAIL_UNIQUE_INDEX, { unique: true, where: 'deleted_at IS NULL' })
    email: string;

    @Column({
        nullable: true,
        select: false,
    })
    password: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({ nullable: true, default: 21 })
    age: number;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    short_bio: string;

    @Column({
        nullable: true,
        type: 'text',
    })
    about: string;

    @Column({
        nullable: true,
        type: 'text',
    })
    interests: string;
}