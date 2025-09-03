import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
     useFactory: (config: ConfigService) => 
  config.get<SequelizeModuleOptions>('database') as SequelizeModuleOptions,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}