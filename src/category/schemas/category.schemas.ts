import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Food } from '../../foods/schemas/food.schemas';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category extends Document {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Foods' }] })
  foods: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
