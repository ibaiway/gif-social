import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
