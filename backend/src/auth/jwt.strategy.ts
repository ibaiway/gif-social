import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { EncryptionService } from 'src/utils/encryption/encryption.service';
import { TokenService, TokenType } from 'src/utils/token/token.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private encryptionService: EncryptionService,
    private tokenService: TokenService,
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest(req: Request) {
        try {
          if (!req.headers.authorization) {
            throw new Error(
              'token was not provided, authorization header is empty',
            );
          }
          const tokenFromHeader = req.headers.authorization
            .replace('Bearer ', '')
            .trim();
          const decryptedToken =
            this.encryptionService.decrypt(tokenFromHeader);
          const tokenType = this.tokenService.getTokenType(decryptedToken);

          if (tokenType !== TokenType.ACCESS_TOKEN) {
            throw new Error('wrong token type provided');
          }
          return decryptedToken;
        } catch (e) {
          console.log('Token is not valid', e.message);
          return null;
        }
      },
      secretOrKey: configService.get<string>('authentication.token.secret'),
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: any) {
    const user = this.userService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
