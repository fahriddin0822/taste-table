import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Category } from '../../category/schemas/category.schemas';

export type MenuDocument = HydratedDocument<Menu>;

@Schema()
export class Menu extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  categories: Types.ObjectId[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
