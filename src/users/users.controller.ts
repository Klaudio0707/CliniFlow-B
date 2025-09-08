import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from '../auth/guards/admin.guard'; 
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt-from-cookie'), AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  // @UseGuards(AuthGuard('jwt-from-cookie'), AdminGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  // @UseGuards(AuthGuard('jwt-from-cookie'), AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  // @UseGuards(AuthGuard('jwt-from-cookie'), AdminGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }


  @Patch('profile')
  // @UseGuards(AuthGuard('jwt-from-cookie'))
  updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.update(userId, updateUserDto);
  }


  @Delete('profile')
 
  deleteProfile(@Req() req) {
    const userId = req.user.id;
    return this.usersService.remove(userId);
  }
}