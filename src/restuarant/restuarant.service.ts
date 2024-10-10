import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Retaurant, RetaurantDocument } from './models/restuarant.model'; // Restaurant schema import qilingan
import { Model } from 'mongoose';
import { CreateRestuarantDto } from './dto/create-restuarant.dto';
import { UpdateRestuarantDto } from './dto/update-restuarant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Retaurant.name) private restaurantModel: Model<RetaurantDocument>, // Restaurant modelini inject qilingan
  ) {}


  async create(createRestaurantDto: CreateRestuarantDto) {
    const newRestaurant = new this.restaurantModel(createRestaurantDto); // Yangi restoran yaratish
    return await newRestaurant.save(); // Yangi restoran ma'lumotlarini saqlash
  }

  async findAll() {
    return await this.restaurantModel.find().populate('tables'); // Barcha restoranlarni qaytarish
  }

  async findOne(id: string) {
    return await this.restaurantModel.findById(id).exec(); // ID bo'yicha restoranni topish
  }

  async update(id: string, updateRestaurantDto: UpdateRestuarantDto) {
    return await this.restaurantModel.findByIdAndUpdate(id, updateRestaurantDto, {
      new: true, // Yangilangan hujjatni qaytarish
    }).exec();
  }

  async remove(id: string) {
    return await this.restaurantModel.findByIdAndDelete(id).exec(); // ID bo'yicha restoranni o'chirish
  }
}
