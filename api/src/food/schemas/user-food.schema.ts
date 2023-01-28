import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Food, FoodSchema } from './food.schema';

export type UserFoodDocument = HydratedDocument<UserFood>;

@Schema()
export class UserFood {

    @Prop()
    email: string;

    @Prop({ type: [FoodSchema] })
    foods: Food[];
}

export const UserFoodSchema = SchemaFactory.createForClass(UserFood);