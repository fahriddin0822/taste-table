import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Tables } from '../../tables/models/table.model';
import { Branch } from '../../branch/models/branch.model';

export type RetaurantDocument = HydratedDocument<Restaurant>;

@Schema({ versionKey: false })
export class Restaurant {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Branch" }] })
  branches: Branch[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);