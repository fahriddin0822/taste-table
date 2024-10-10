import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Retaurant, RetaurantDocument } from '../restuarant/models/restuarant.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './schemas/menu.schemas';
import { Tables } from '../tables/models/table.model';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Retaurant.name) private readonly restaurantModel: Model<RetaurantDocument>,
    @InjectModel(Menu.name) private readonly menuModel: Model<MenuDocument>,
    @InjectModel(Tables.name) private tableModel: Model<Tables>,
  ) {}

  async getRestaurantAndTable(restaurantId: string, tableId: string) {
    const restaurant = await this.restaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const table = await this.tableModel.findById(tableId);
    if (!table) {
      throw new NotFoundException('Table not found');
    }

    return {
      restaurant,
      table,
    };
  }

  async getMenu(menuId: string) {
    const menu = await this.menuModel.findById(menuId).populate({
      path: 'categories',
      populate: {
        path: 'foods',
        model: 'Food',
        select: 'name price description',  // Fetching only necessary fields
      },
    }).exec();

    // Perform any necessary data formatting
    return menu;
  }

  async getMenuForRestaurant(restaurantId: string) {
    // Here you can implement fetching menu from the database
    // Example:
    const menu = await this.getMenu(restaurantId);
    return menu;
  }

  create(createMenuDto: CreateMenuDto) {
    return this.menuModel.create(createMenuDto);
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
