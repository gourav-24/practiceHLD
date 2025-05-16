import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { HealthCheckModule } from './api/index';
const API_MODULES = [HealthCheckModule];

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ...API_MODULES,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
