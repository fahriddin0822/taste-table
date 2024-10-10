import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

@Schema()
export class Food extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Translation' }], default: [] })
  translations: Types.ObjectId[];  // Make translations optional
}

export const FoodSchema = SchemaFactory.createForClass(Food);
