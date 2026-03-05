import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SendEmailModule } from './send-email/send-email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ChatRequest } from './chat/entities/chat-request.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from "path"
import { SendOtp } from './send-email/entities/sendotp.entity';
@Module({
  imports: [
     // ✅ Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        entities: [ChatRequest, SendOtp],
        synchronize: true, // Enable for development to auto-create tables
      })
    }),
    SendEmailModule,
    ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
