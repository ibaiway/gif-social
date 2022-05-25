import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  secret = this.configService.get<string>('authentication.token.secret');
  algorithm = 'aes-192-cbc';
  key = scryptSync(this.secret, 'salt', 24);
  iv = Buffer.alloc(16, 0); // Initialization crypto vector

  encrypt(text: string) {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(text: string) {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
