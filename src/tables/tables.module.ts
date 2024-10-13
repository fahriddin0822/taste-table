import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tables, TablesSchema } from './models/table.model';
import { Restaurant, RestaurantSchema } from '../restuarant/models/restuarant.model';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: Tables.name,
      schema: TablesSchema
    },
    {
      name: Restaurant.name,
      schema: RestaurantSchema
    }
  ]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
  exports:[TablesService]
})
export class TablesModule {}
