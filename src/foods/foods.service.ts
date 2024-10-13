import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Food } from './schemas/food.schemas';
import { TranslationService } from '../translation/translation.service';
import { Category } from '../category/schemas/category.schemas';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    private translationService: TranslationService,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) { }

  async addFoodToCategory(categoryName: string, createFoodDto: CreateFoodDto): Promise<Food> {
    const category = await this.categoryModel.findOne({ name: categoryName });
    if (!category) {
      throw new NotFoundException(`Category with name ${categoryName} not found`);
    }

    // Initialize translations properly with an empty array of ObjectId if needed
    const newFood = new this.foodModel({
      name: createFoodDto.name,  // Ensure name is passed
      description: createFoodDto.description,  // Ensure description is passed
      price: createFoodDto.price,
      category: createFoodDto.category,
    });
    

    const savedFood = await newFood.save();

    // Ensure savedFood.translations is an array of ObjectId, even if it's empty
    // savedFood.translations = savedFood.translations || [] as Types.ObjectId[];  // Properly cast as ObjectId array

    await category.save();
    category.foods.push(savedFood._id as Types.ObjectId);

    return savedFood as unknown as Food;  // Type-cast the result to Food to satisfy TypeScript
  }





  async getFoodsByCategoryName(categoryName: string): Promise<Food[]> {
    const category = await this.categoryModel.findOne({ name: categoryName }).populate({
      path: 'foods',
      model: 'Food',
      select: 'name price description translations',  // Select the necessary fields
    }).exec();  // Ensure exec() to trigger the query

    if (!category) {
      throw new NotFoundException(`Category with name ${categoryName} not found`);
    }

    // Type-cast the populated foods array as Food[]
    return category.foods as unknown as Food[];
  }


  // Create food and store name and description in Translation table
  async createFood(createFoodDto: CreateFoodDto, translations: Record<string, { name: string; description: string }>) {
    // Create the food without name and description (store only price, category, etc.)
    const newFood = new this.foodModel({
      price: createFoodDto.price,
      category: createFoodDto.category,  // Assuming you have a category field
    });

    const savedFood = await newFood.save();

    // Save translations (name and description) in the Translation table
    await this.translationService.createTranslation(savedFood._id.toString(), translations);

    return savedFood;
  }

  async getFoodsByCategoryNameWithTranslation(categoryName: string, langCode: string): Promise<any[]> {
    // Find the category and populate the foods
    const category = await this.categoryModel.findOne({ name: categoryName }).populate({
      path: 'foods',
      model: 'Food',
      select: 'name price description translations',  // Populate the necessary fields
    }).exec();
  
    if (!category) {
      throw new NotFoundException(`Category with name ${categoryName} not found`);
    }
  
    const foods = category.foods as unknown as Food[];
  
    const foodsWithTranslations = await Promise.all(
      foods.map(async (food: Food) => {
        const translatedData = await this.translationService.getTranslation(food._id.toString(), langCode);
  
        return {
          ...food.toObject(),
          name: translatedData.name || food.name,              // Use translated name or fallback to default
          description: translatedData.description || food.description  // Use translated description or fallback
        };
      })
    );
  
    return foodsWithTranslations;
  }
  
  




  // // Create food with translations
  // async createFood(createFoodDto: CreateFoodDto, translations: Record<string, string>) {
  //   const newFood = new this.foodModel({
  //     name: createFoodDto.name,
  //     price: createFoodDto.price,
  //     description: createFoodDto.description,
  //   });

  //   const savedFood = await newFood.save();

  //   // Save the translations for the food
  //   await this.translationService.createTranslation(savedFood._id.toString(), translations);

  //   return savedFood;
  // }

  // Get food by ID with translation
  async getFoodById(foodId: string, langCode: string) {
    const food = await this.foodModel.findById(foodId).populate('translation').exec();
    if (!food) {
      throw new NotFoundException('Food not found');
    }

    // Get the translated name if available
    const translatedName = await this.translationService.getTranslation(foodId, langCode);

    return {
      ...food.toObject(),
      name: translatedName || food.name,  // Use translation if available, otherwise use default name
    };
  }
  create(createFoodDto: CreateFoodDto) {
    return 'This action adds a new food';
  }

  findAll() {
    return `This action returns all foods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
