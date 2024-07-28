import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Matches, Min } from "class-validator";

export class GetDestinationDto {

    @ApiProperty()
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    longitude: number;

    @ApiProperty({
        example: '16:00',
    })
    @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    start_time: string;

    @ApiProperty({
        example: 6,
    })
    @IsNumber()
    @Min(6)
    duration: number;
}