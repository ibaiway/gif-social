import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decode, sign, verify } from 'jsonwebtoken';
import { EncryptionService } from '../encryption/encryption.service';

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

type JWT = {
  exp: number;
  type: TokenType;
  sub: string;
};

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private encryptionService: EncryptionService,
  ) {}

  generateAccessToken(userId: string) {
    return this.generateToken(userId, TokenType.ACCESS_TOKEN);
  }

  generateRefreshToken(userId: string) {
    return this.generateToken(userId, TokenType.REFRESH_TOKEN);
  }

  private generateToken(userId: string, type: TokenType) {
    const audience = this.configService.get<string>(
      'authentication.token.audience',
    );
    const issuer = this.configService.get<string>(
      'authentication.token.issuer',
    );
    const secret = this.configService.get<string>(
      'authentication.token.secret',
    );
    const expiresIn =
      type === TokenType.ACCESS_TOKEN
        ? this.configService.get<string>('authentication.token.expiresIn')
        : this.configService.get<string>(
            'authentication.refreshToken.expiresIn',
          );

    const token = sign({ type }, secret, {
      expiresIn,
      audience: audience,
      issuer: issuer,
      subject: userId,
    });

    return {
      token: this.encryptionService.encrypt(token),
      expiration: (decode(token) as JWT).exp * 1000,
    };
  }

  getTokenType(token: string): TokenType {
    return (
      verify(
        token,
        this.configService.get<string>('authentication.token.secret'),
      ) as JWT
    ).type;
  }

  parseTokenAndGetUserId(token: string): string {
    const decryptedToken = this.encryptionService.decrypt(token);
    const decoded = verify(
      decryptedToken,
      this.configService.get<string>('authentication.token.secret'),
    ) as JWT;
    return decoded.sub || '';
  }
}
