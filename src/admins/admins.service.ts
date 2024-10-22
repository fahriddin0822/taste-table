import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { Admin } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import *  as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) { }
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = await this.adminModel.create({...createAdminDto, password: hashedPassword });
    
    const tokens = await this.generateTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    newAdmin.hashed_refresh_token = hashed_refresh_token;
    await newAdmin.save();
    return { 
      newAdmin, tokens };
  }

  async generateTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, {new:true});
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
