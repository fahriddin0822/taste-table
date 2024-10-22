import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tables, TablesDocument } from './schemas/table.schema';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from '../restaurant/schemas/restaurant.schema';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Restaurant.name) private readonly restaurantModel: Model<RestaurantDocument>,
    @InjectModel(Tables.name) private readonly tablesModel: Model<TablesDocument>,
  ) { }

  async create(createTableDto: CreateTableDto) {

    const { restaurant_id } = createTableDto;
    const restaurant = await this.restaurantModel.findById(restaurant_id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const newTable = this.tablesModel.create(createTableDto);

    return newTable
  }

  async findAll(): Promise<Tables[]> {
    return this.tablesModel.find().populate('restaurant').exec();  // Populates restaurant data
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
