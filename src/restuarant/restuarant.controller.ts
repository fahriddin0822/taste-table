import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Res } from '@nestjs/common';
import { RestaurantService } from './restuarant.service';
import { CreateRestuarantDto } from './dto/create-restuarant.dto';
import { UpdateRestuarantDto } from './dto/update-restuarant.dto';

@Controller('restuarant')
export class RestuarantController {
  constructor(private readonly restuarantService: RestaurantService) { }

  @Patch(':restaurantId/add-branch/:branchId')
  addBranch(
    @Param('restaurantId') restaurantId: string,
    @Param('branchId') branchId: string,
  ) {
    return this.restuarantService.addBranchToRestaurant(restaurantId, branchId);
  }

  @Post()
  create(@Body() createRestaurantDto: CreateRestuarantDto) {
    return this.restuarantService.create(createRestaurantDto);
  }

  @Get()
  async getAllRestaurants(@Res() res) {
    const restaurants = await this.restuarantService.findAll();
    return res.status(200).json(restaurants);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restuarantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestuarantDto: UpdateRestuarantDto) {
    return this.restuarantService.update(id, updateRestuarantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restuarantService.remove(id);
  }
}
