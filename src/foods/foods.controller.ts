import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  async createFood(@Body() createFoodDto: CreateFoodDto) {
    // Ensure that 'translations' follows the expected structure
    return this.foodsService.createFood(createFoodDto, createFoodDto.translations);
  }

  // Add a food to a category by category name
  @Post('category/:categoryName')
  async addFoodToCategory(
    @Param('categoryName') categoryName: string,
    @Body() createFoodDto: CreateFoodDto,
  ) {
    return this.foodsService.addFoodToCategory(categoryName, createFoodDto);
  }

  // Get all foods by category name
  @Get('category/:categoryName')
  async getFoodsByCategoryName(@Param('categoryName') categoryName: string) {
    return this.foodsService.getFoodsByCategoryName(categoryName);
  }

  // Get all foods by category name
  @Get('category/:categoryName/:langCode?')
  async getFoodsByCategoryNameWithTranslation(@Param('categoryName') categoryName: string,
  @Param('langCode') langCode: string) {
    const language = langCode || 'en';
    return this.foodsService.getFoodsByCategoryNameWithTranslation(categoryName, language);
  }

  @Get(':foodId/:langCode')
  async getFood(
    @Param('foodId') foodId: string,
    @Param('langCode') langCode: string,
  ) {
    return this.foodsService.getFoodById(foodId, langCode);
  }

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id);
  }
}
