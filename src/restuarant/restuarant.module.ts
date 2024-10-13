import { Module } from '@nestjs/common';
import { RestuarantController } from './restuarant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './models/restuarant.model';
import { JwtModule } from '@nestjs/jwt';
import { RestaurantService } from './restuarant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,  // Corrected from RetaurantSchema
      },
    ]),
  ],
  controllers: [RestuarantController],
  providers: [RestaurantService],
  exports: [RestaurantService, MongooseModule],
})
export class RestaurantModule {}