import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientsDocument = Clients & Document;

@Schema()
export class Clients {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })  // This can be 'user' or 'admin'
  role: string;
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);
