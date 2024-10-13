import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Branch, BranchSchema } from './models/branch.model';
import { Restaurant, RestaurantSchema } from '../restuarant/models/restuarant.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Branch.name,
      schema: BranchSchema
    },
    {
      name: Restaurant.name,
      schema: RestaurantSchema
    }
  ]),],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule { }
