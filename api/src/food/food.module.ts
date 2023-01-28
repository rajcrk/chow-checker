import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import { Food, FoodSchema } from "./schemas/food.schema";
import { UserFood, UserFoodSchema } from "./schemas/user-food.schema";

@Module({
    controllers: [
        FoodController,
    ],
    providers: [
        FoodService
    ],
    imports: [
        MongooseModule.forFeature([
            { name: Food.name, schema: FoodSchema },
            { name: UserFood.name, schema: UserFoodSchema }]),
        UserModule
    ],
    exports: [
    ]
})
export class FoodModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // throw new Error("Method not implemented.");
    }
}