import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    FoodModule, 
    AuthModule,
    MongooseModule.forRoot(
      process.env.MONGO_DB_URL ? 
        process.env.MONGO_DB_URL : "mongodb://localhost/chowChecker")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

  }
  
}
