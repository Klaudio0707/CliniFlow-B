import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from '../auth/guards/admin.guard'; 
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt-from-cookie'), AdminGuard) 
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt-from-cookie'), AdminGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt-from-cookie'), AdminGuard)
  @Patch('profile')
  updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.update(userId, updateUserDto);
  }

 @UseGuards(AuthGuard('jwt-from-cookie'), AdminGuard)
  @Delete('delete/profile')
  deleteProfile(@Req() req) {
    const userId = req.user.id;
    return this.usersService.remove(userId);
  }
}