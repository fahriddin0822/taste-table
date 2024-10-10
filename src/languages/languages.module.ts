import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Languages, LanguagesSchema } from './schemas/language.schemas';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Languages.name,
        schema: LanguagesSchema
      },
      {
        name: Languages.name,
        schema: LanguagesSchema
      }
    ]),
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
