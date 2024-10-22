import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, HydrateOptions } from "mongoose";

export  type RestaurantDocument = HydratedDocument<Restaurant> 

@Schema()
export class Restaurant {
    @Prop()
    name:string;

    @Prop()
    phone_number: string;

    @Prop()
    description: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

