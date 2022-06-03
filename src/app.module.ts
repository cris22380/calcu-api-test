import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { EventsDaoModule } from './modules/events-dao/event-dao.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_HOST),
    UserModule,
    EventsDaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
