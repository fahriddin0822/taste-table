import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Subschema for name and description translation
@Schema({ _id: false })
export class TranslationDetails {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;
}

export const TranslationDetailsSchema = SchemaFactory.createForClass(TranslationDetails);

@Schema()
export class Translation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Food' })
  food: Types.ObjectId;  // Reference to the Food document

  @Prop({
    type: Map,
    of: TranslationDetailsSchema,  // Store name and description for multiple languages
  })
  translations: Map<string, TranslationDetails>;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
