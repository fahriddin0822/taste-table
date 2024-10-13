import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Restaurant } from '../../restuarant/models/restuarant.model';

export type BranchDocument = HydratedDocument<Branch>;

@Schema({ versionKey: false })
export class Branch {

    @Prop({ required: true })
    phone: string;

    @Prop()
    location: string;

    @Prop()
    schedule: string;

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
    restaurant_id: Restaurant;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);