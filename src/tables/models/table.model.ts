import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { Restaurant } from '../../restuarant/models/restuarant.model';

export type TablesDocument = HydratedDocument<Tables>;

@Schema({ versionKey: false })
export class Tables {
    @Prop()
    number: string;

    @Prop()
    amount: number;

    @Prop()
    qr_code:string;

    @Prop({
        type:mongoose.Schema.Types.ObjectId,
        ref:"Retaurant"
    })
    restaurant_id: Restaurant;   
}

export const TablesSchema = SchemaFactory.createForClass(Tables);