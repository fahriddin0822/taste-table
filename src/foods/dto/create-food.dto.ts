import { IsNotEmpty, IsNumber, IsString, IsObject } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsObject()
  @IsNotEmpty()
  translations: Record<string, { name: string; description: string }>;  // Translations map: { 'en': 'Pizza', 'es': 'Pizza' }
}
