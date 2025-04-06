import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ZohoService } from './zoho.service';
import { ZohoController } from './zoho.controller';

@Module({
  imports: [HttpModule],
  controllers: [ZohoController],
  providers: [ZohoService],
})
export class ZohoModule {}
