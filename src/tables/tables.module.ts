import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tables, TablesSchema } from './models/table.model';
import { Retaurant, RetaurantSchema } from '../restuarant/models/restuarant.model';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: Tables.name,
      schema: TablesSchema
    },
    {
      name: Retaurant.name,
      schema: RetaurantSchema
    }
  ]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
  exports:[TablesService]
})
export class TablesModule {}
