import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food } from './schemas/food.schemas';
import { FoodSchema } from '../foods/schemas/food.schemas';
import { TranslationModule } from '../translation/translation.module';
import { Category, CategorySchema } from '../category/schemas/category.schemas';
import { Translation, TranslationSchema } from '../translation/schemas/translation.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Food.name,
        schema: FoodSchema
      }, { name: Category.name, schema: CategorySchema },
    ]), 
    TranslationModule,TranslationModule,
    MongooseModule.forFeature([{ name: Translation.name, schema: TranslationSchema }]),],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService]
})
export class FoodsModule { }
