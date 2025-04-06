import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';
import { ZohoController } from './zoho/zoho.controller';
import { ZohoService } from './zoho/zoho.service';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ZOHO_CLIENT_ID: Joi.string().required(),
        ZOHO_CLIENT_SECRET: Joi.string().required(),
        ZOHO_REDIRECT_URI: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    HttpModule,
  ],
  controllers: [ZohoController],
  providers: [ZohoService, AppService],
})
export class AppModule {}
