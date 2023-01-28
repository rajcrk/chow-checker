import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class Food {

    @Prop()
    name: string;

    @Prop()
    dateAdded: Date;

    @Prop()
    expiryDate: Date;
}

// Generate a Mongoose Schema before use as Subdocument
export const FoodSchema = SchemaFactory.createForClass(Food);