import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { FoodDto } from "./food.model";

export class CreateUserFoodDto {

    @IsString()
    @ApiProperty()
    readonly email: string;

    @ApiProperty({ type: FoodDto, isArray: true, required: true })
    readonly foods: FoodDto[];
}