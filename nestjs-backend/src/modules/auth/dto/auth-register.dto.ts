import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Min } from "class-validator";

export class AuthRegisterDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @Min(5)
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    phone_number: string;
}