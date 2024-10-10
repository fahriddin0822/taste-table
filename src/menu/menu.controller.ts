import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Res } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { RestaurantService } from '../restuarant/restuarant.service';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly restaurantService: RestaurantService
  ) {}

  @Get(':restaurant_id/:table_id')
  async getMenuForTable(
    @Param('restaurant_id') restaurantId: string,
    @Param('table_id') tableId: string,
  ) {
    const data = await this.menuService.getRestaurantAndTable(restaurantId, tableId);
    return data;
  }

  @Get(':menuId')
  async getMenu(@Param('menuId') menuId: string) {
    const menu = await this.menuService.getMenu(menuId);
    return menu;
  }

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
