import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { UserFood, UserFoodDocument } from './schemas/user-food.schema';
import { CreateUserFoodDto } from './models/create-user-food.model';
import { removeNewLine } from 'src/common/utils/utils';
import { ResponseUtility } from 'src/common/utils/response/Response';

@Injectable()
export class FoodService {

    constructor(
        @InjectModel(UserFood.name) private userFoodModel: Model<UserFoodDocument>,
        @InjectConnection() private connection: Connection) { }

    async search(searchText: string): Promise<any> {

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // Creating an instance of open api with congif.
        const openai = new OpenAIApi(configuration);

        // Question created to check if the user entered a valid food.
        const questionToCheckIfFood = `Is ${searchText} a type of food? Give me either yes or no as response`;

        // Question to check the number of days the food can be used.
        const questionToCheckDays = `Give me the minimum number of days I use cooked ${searchText}? Just give me the number of days and no other text and on the same line`;

        // Sending network call to chat GPT to check validity.
        const isFoodCheckResp = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: questionToCheckIfFood,
        }).then((response) => {
            let text = response.data.choices[0].text;

            console.log(`Response for if food question -- ${response.data.choices[0].text}`);
            return removeNewLine(text);
        });

        console.log(`isFoodCheckResp is ${isFoodCheckResp} for search ` + searchText);

        // If the food is valid, sending request to check number of days.
        if (isFoodCheckResp === 'Yes' || isFoodCheckResp === 'yes') {
            const numOfDaysResp = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: questionToCheckDays,
            }).then((response) => {
                let text = response.data.choices[0].text;
                return removeNewLine(text);
            });

            return ResponseUtility.generateSuccessResponse(numOfDaysResp);
        } else {
            return ResponseUtility.generateErrorResponse('Entered text is not a valid food, sorry!');
        }
    }

    async create(createUserFood: CreateUserFoodDto): Promise<any> {
        console.log('Entering create in FoodService ', createUserFood);

        // Checking if data for the user alrady exists.
        const userFoodList = await this.userFoodModel
            .find({ email: createUserFood.email }, 'foods').exec();

        if (!(userFoodList === undefined || userFoodList.length == 0)) {
            // If data already exists for the user, add the food to existing list.
            const responseToLog = await this.userFoodModel
                .findOneAndUpdate(
                    { email: createUserFood.email },
                    { $addToSet: { foods: createUserFood.foods } })
                .exec();
            return ResponseUtility.generateSuccessResponse(responseToLog);
        } else {

            // If there is no data for the user, Add new object for the user.
            const createdUserFood = new this.userFoodModel(createUserFood);
            const response = await createdUserFood.save();
            return ResponseUtility.generateSuccessResponse(response);
        }
    }

    async getFoodListForEmail(email: string): Promise<any> {
        return this
            .userFoodModel.find({ email: email }, 'foods').exec();
    }

    async delete(email: string, foodId: string): Promise<any> {
        // Checking if data for the user alrady exists.
        let userFoodList = await this.userFoodModel
            .find({ email: email }, 'foods').exec();

        if (!(userFoodList === undefined || userFoodList.length == 0)) {

            await this.userFoodModel
                .updateOne(
                    { email: email },
                    { $pull: { foods: { _id: foodId } } },
                    { upsert: false, multi: true })
                .exec();
            return this.getFoodListForEmail(email);
        } else {
            return ResponseUtility.generateSuccessResponse('No food list is available');
        }
    }

    async findAll(): Promise<UserFood[]> {
        return this.userFoodModel.find().exec();
    }
}
