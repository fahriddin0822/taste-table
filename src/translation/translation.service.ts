import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Translation } from './schemas/translation.schemas';
import { Languages } from '../languages/schemas/language.schemas';
import { Food } from '../foods/schemas/food.schemas';

@Injectable()
export class TranslationService {
  constructor(
    @InjectModel(Translation.name) private translationModel: Model<Translation>,
    @InjectModel(Languages.name) private languageModel: Model<Languages>,
    @InjectModel(Food.name) private foodModel: Model<Food>,
  ) {}

  async createTranslation(foodId: string, translations: Record<string, { name: string; description: string }>): Promise<Translation> {
    try {
      console.log('Saving translations for food:', foodId, translations);
      const newTranslation = new this.translationModel({
        food: foodId,
        translations: translations
      });
  
      return await newTranslation.save();  // Ensure you save the translation
    } catch (error) {
      console.error('Error saving translation:', error);
      throw new Error('Failed to save translations');
    }
  }
  
  

  async getTranslation(foodId: string, langCode: string): Promise<{ name: string, description: string }> {
    const translation = await this.translationModel.findOne({ food: foodId }).exec();
    if (!translation) {
      return { name: '', description: '' };  // Return empty strings if no translation is found
    }
  
    const translatedData = translation.translations.get(langCode);
    if (translatedData) {
      return {
        name: translatedData.name || '',         // Translated name
        description: translatedData.description || '',  // Translated description
      };
    }
  
    return { name: '', description: '' };  // Default to empty strings if translation not found
  }
  
  


  create(createTranslationDto: CreateTranslationDto) {
    return this.translationModel.create(createTranslationDto);
  }

  // async createTranslation(foodId: string, translations: Record<string, string>) {
  //   const translation = new this.translationModel({
  //     food: foodId,
  //     translations,
  //   });

  //   const savedTranslation = await translation.save();

  //   // Update the Food document with a reference to the saved translation
  //   await this.foodModel.findByIdAndUpdate(foodId, { translation: savedTranslation._id });
  //   return savedTranslation;
  // }

  // Get translation by food ID and language code
  // async getTranslation(foodId: string, langCode: string) {
  //   const translation = await this.translationModel.findOne({ food: foodId });
  //   if (!translation) {
  //     throw new NotFoundException('Translation not found');
  //   }
  //   return translation.translations.get(langCode) || translation.translations.get('en');  // Fallback to 'en'
  // }

  findAll() {
    return this.translationModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} translation`;
  }

  update(id: number, updateTranslationDto: UpdateTranslationDto) {
    return `This action updates a #${id} translation`;
  }

  remove(id: number) {
    return `This action removes a #${id} translation`;
  }
}
