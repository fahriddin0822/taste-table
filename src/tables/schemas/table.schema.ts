import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Restaurant } from "../../restaurant/schemas/restaurant.schema";

export type TablesDocument = HydratedDocument<Tables>

@Schema()
export class Tables {
    @Prop()
    numbers: string;

    @Prop()
    amount: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })  // Reference to the Restaurant
    restaurant: Restaurant;
}

export const TablesSchema = SchemaFactory.createForClass(Tables);
