import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
   imports: [
      SequelizeModule.forFeature([UserEntity]),],
  controllers: [UsersController],
  providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
