import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOAuth2, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { ResponseUtility } from "src/common/utils/response/Response";
import { FoodService } from "./food.service";
import { CreateUserFoodDto } from "./models/create-user-food.model";

@ApiTags('food')
@Controller('food')
export class FoodController {

    constructor(private readonly foodService: FoodService) {
    }

    @UseGuards(JwtGuard)
    @Get('/search/:searchText')
    @ApiOperation({ summary: 'Get users their requested devices' })
    @ApiOAuth2(['read'])
    @ApiResponse({
        status: 200,
        description: 'Returns an array of RequestedDevice object',
    })
    @ApiResponse({
        status: 404,
        description: 'No response from GPT',
        type: NotFoundException
    })
    async search(@Param('searchText') searchText: string): Promise<any> {
        try {
            const response = await this.foodService.search(searchText);
            return response;
        } catch (error) {
            return ResponseUtility.generateErrorResponse(error);
        }
    }

    @Post()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Add new food to user' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiOAuth2(['write'])
    create(@Body() createUserFood: CreateUserFoodDto): Promise<any> {
        return this.foodService.create(createUserFood);
    }

    @UseGuards(JwtGuard)
    @Get('/:email')
    @ApiOperation({ summary: 'Get users their food list' })
    @ApiOAuth2(['read'])
    @ApiResponse({
        status: 200,
        description: 'Returns an array of RequestedDevice object',
    })
    @ApiResponse({
        status: 404,
        description: 'No such email',
        type: NotFoundException
    })
    async getFoodListForEmail(@Param('email') email: string): Promise<any> {
        try {
            const response = await this.foodService.getFoodListForEmail(email);
            console.log('response ===> ');
            console.log(response);
            return response;
        } catch (error) {
            return ResponseUtility.generateErrorResponse(error);
        }
    }

    @UseGuards(JwtGuard)
    @Delete('/:email/:foodId')
    @ApiOperation({ summary: 'Delete a food item for user' })
    @ApiOAuth2(['read'])
    @ApiResponse({
        status: 200,
        description: 'Object indicating if the food item is deleted',
    })
    @ApiResponse({
        status: 404,
        description: 'No such email or food item',
        type: NotFoundException
    })
    async deleteFoodItem(
        @Param('email') email: string,
        @Param('foodId') foodId: string): Promise<any> {

        try {
            const response = await this.foodService.delete(email, foodId);
            return response;
        } catch (error) {
            return ResponseUtility.generateErrorResponse(error);
        }
    }
}