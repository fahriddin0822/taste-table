import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Res } from '@nestjs/common';
import { RestaurantService } from './restuarant.service';
import { CreateRestuarantDto } from './dto/create-restuarant.dto';
import { UpdateRestuarantDto } from './dto/update-restuarant.dto';

@Controller('restuarant')
export class RestuarantController {
  constructor(private readonly restuarantService: RestaurantService) { }

  @Post()
  create(@Body() createRestuarantDto: CreateRestuarantDto) {
    return this.restuarantService.create(createRestuarantDto);
  }

  @Get()
  findAll() {
    return this.restuarantService.findAll();
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
