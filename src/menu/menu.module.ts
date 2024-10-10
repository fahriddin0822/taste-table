import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Menu, MenuSchema } from './schemas/menu.schemas';
import { RestuarantModule } from '../restuarant/restuarant.module';
import { Tables, TablesSchema } from '../tables/models/table.model';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: Menu.name,
      schema: MenuSchema
    },
    {
      name: Tables.name,
      schema: TablesSchema
    }
  ]),
  JwtModule.register({}),
  RestuarantModule
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports:[MenuService]
})
export class MenuModule {}
