import { Injectable, Param, Patch } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RetaurantDocument } from './models/restuarant.model'; // Restaurant schema import qilingan
import { Model } from 'mongoose';
import { CreateRestuarantDto } from './dto/create-restuarant.dto';
import { UpdateRestuarantDto } from './dto/update-restuarant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<RetaurantDocument>, // Restaurant modelini inject qilingan
  ) { }

  async addBranchToRestaurant(restaurantId: string, branchId: string): Promise<Restaurant> {
    return this.restaurantModel
      .findByIdAndUpdate(
        restaurantId,
        { $push: { branches: branchId } },
        { new: true }  // Return the updated document
      )
      .populate('branches')
      .exec();
  }

  



  create(createRestuarantDto: CreateRestuarantDto) {
    return this.restaurantModel.create(createRestuarantDto);
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().populate('branches').exec();
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
