import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tables, TablesDocument } from './models/table.model';
import { Model } from 'mongoose';
import { Retaurant, RetaurantDocument } from '../restuarant/models/restuarant.model';
import * as QRCode from "qrcode";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Retaurant.name) private restaurantModel: Model<RetaurantDocument>,
    @InjectModel(Tables.name) private tablesModel: Model<TablesDocument>,
  ) { }

  async create(createTableDto: CreateTableDto) {
    const { restaurant_id } = createTableDto;
    const restaurant = await this.restaurantModel.findById(restaurant_id);
    if (!restaurant) {
      throw new BadRequestException("This restaurant not exist.");
    }
    const newTable = await this.tablesModel.create(createTableDto);
    const baseUrl = `${process.env.API_URL}:${process.env.PORT}/menu`;
    const link = `${baseUrl}/${restaurant._id}/${newTable._id}`;
    await this.generateQrCodeFile(link, String(newTable._id));
    // const qrCodePath = await this.generateQrCodeFile(baseUrl, String(newTable._id));

    newTable.qr_code = link;
    await newTable.save();

    // Associate table with restaurant (if needed)
    restaurant.tables.push(newTable);
    await restaurant.save();

    return { newTable };
  }


  async generateQrCodeFile(text: string, fileName: string): Promise<string> {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(text);
      const filePath = path.join(
        __dirname,
        '../public/qr-codes',
        `${fileName}.png`,
      );
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, qrCodeBuffer);

      return filePath;
    } catch (error) {
      throw new Error(`Error generating QR code: ${error.message}`);
    }
  }

  async findAll() {
    return this.tablesModel.find().populate('restaurant_id');
  }

  async findOne(id: string) {
    return this.tablesModel.findById(id).populate('restaurant_id');
  }

  async update(id: string, updateTableDto: UpdateTableDto) {
    return this.tablesModel.findByIdAndUpdate(id, updateTableDto, { new: true });
  }

  async remove(id: string) {
    return this.tablesModel.findByIdAndDelete(id);
  }
}
