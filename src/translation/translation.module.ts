import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Translation, TranslationSchema } from './schemas/translation.schemas';
import { Languages, LanguagesSchema } from '../languages/schemas/language.schemas';
import { Food, FoodSchema } from '../foods/schemas/food.schemas';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Translation.name,
      schema: TranslationSchema
    }, 
    { name: Languages.name, schema: LanguagesSchema },
    { name: Food.name, schema: FoodSchema },
  ]),
    TranslationModule
  ],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TranslationService]
})
export class TranslationModule { }
