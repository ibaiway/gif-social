import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './token.service';
import configuration from '../../config/configuration';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), EncryptionModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
