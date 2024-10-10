import { Module } from '@nestjs/common';
import { RestuarantController } from './restuarant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Retaurant, RetaurantSchema } from './models/restuarant.model';
import { JwtModule } from '@nestjs/jwt';
import { RestaurantService } from './restuarant.service';

@Module({
  imports:[
    MongooseModule.forFeature([
    {
      name: Retaurant.name,
      schema: RetaurantSchema
    }
  ]),
  ],
  controllers: [RestuarantController],
  providers: [RestaurantService],
  exports:[RestaurantService, MongooseModule]
})
export class RestuarantModule {}
