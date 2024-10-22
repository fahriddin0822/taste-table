import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Post()
  async create(
    @Body() createAdminDto: CreateAdminDto,
    @Res() res: Response) {
    const { newAdmin, tokens } = await this.adminsService.create(createAdminDto);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: true,   // Ensures the cookie is sent over HTTPS only
      sameSite: 'strict', // Helps protect against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (7 days)
    });

    return res.status(201).json({
      message: 'Admin created successfully',
      id: newAdmin._id,
      admin: newAdmin,
      access_token: tokens.access_token, // Optionally return the access token in the response body
    });
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
