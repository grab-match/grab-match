import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SocialAuthLoginDto {

    @IsNotEmpty()
    @ApiProperty()
    token_id: string;
}