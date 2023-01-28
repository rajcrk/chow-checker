import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class FoodDto {

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsDate()
    @ApiProperty()
    readonly dateAdded: Date;

    @IsDate()
    @ApiProperty()
    readonly expiryDate: Date;
}