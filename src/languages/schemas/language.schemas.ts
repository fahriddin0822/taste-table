import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Languages extends Document {
  @Prop()
  code: string;  // ISO code, e.g., 'en' for English, 'es' for Spanish

  @Prop()
  name: string;  // Name of the language
}

export const LanguagesSchema = SchemaFactory.createForClass(Languages);
