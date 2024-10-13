import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { Branch, BranchDocument } from "./models/branch.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { Restaurant, RetaurantDocument } from "../restuarant/models/restuarant.model";

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Restaurant.name) private readonly restaurantModel: Model<RetaurantDocument>,
    @InjectModel(Branch.name) private readonly branchModel: Model<BranchDocument>,
  ) {}

  

  async createBranch(createBranchDto: CreateBranchDto): Promise<Branch> {
    const { phone, location, restaurant_id } = createBranchDto;
    const restaurant = this.restaurantModel.findOne({ _id:restaurant_id}); 
    if(!restaurant){
      throw new BadRequestException("Restaurant not found");
    }

    const newBranch = await this.branchModel.create(createBranchDto);
    (await restaurant).branches.push(newBranch);
    await (await restaurant).save();
    return newBranch;
  }


  async findAll(): Promise<Branch[]> {
    return this.branchModel.find().populate('restaurant_id').exec();
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchModel.findById(id).populate('restaurant_id').exec();
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const updatedBranch = await this.branchModel
      .findByIdAndUpdate(id, updateBranchDto, { new: true })
      .exec();
    if (!updatedBranch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return updatedBranch;
  }

  async remove(id: string): Promise<void> {
    const result = await this.branchModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
  }
}
