import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tables } from '../../tables/models/table.model';

export type RetaurantDocument = HydratedDocument<Retaurant>;

@Schema({ versionKey: false })
export class Retaurant {
  @Prop()
  name: string;

  @Prop()
  phone_number: string;

  @Prop()
  description: string;

  @Prop({
    type:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tables'
      }
    ]
  })
  tables: Tables[];
}

export const RetaurantSchema = SchemaFactory.createForClass(Retaurant);