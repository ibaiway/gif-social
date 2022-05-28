import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TokenService, TokenType } from 'src/utils/token/token.service';
import { User, UserDocument } from '../user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Request, Response } from 'express';
import { HashingService } from 'src/utils/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private hashingService: HashingService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async generateTokensAndAuthenticateUser(
    res: Response,
    userId: string,
  ) {
    const user = await this.userService.findOne(userId);
    const { token: access_token, expiration: token_expiration } =
      this.tokenService.generateAccessToken(userId);
    const { token: refreshToken, expiration: refreshExpiration } =
      this.tokenService.generateRefreshToken(userId);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      expires: new Date(refreshExpiration),
    });
    res.status(200).json({ access_token, token_expiration, user });
  }

  async login(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userService.findOneByEmail(createUserDto.email);
    if (!user) {
      console.log('Incorrect login details');
    }
    const isMatch = await this.hashingService.compare(
      createUserDto.password,
      user.password,
    );
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect login details' });
    }
    this.generateTokensAndAuthenticateUser(res, user.id);
  }

  async signup(createUserDto: CreateUserDto, res: Response) {
    const emailExist = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (emailExist) {
      return res.status(401).json({ error: 'Email already in use' });
    }
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );
    const createdUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    if (!createdUser) {
      console.log('some error user not created');
    }
    this.generateTokensAndAuthenticateUser(res, createdUser.id);
  }

  async refreshToken(req: Request, res: Response) {
    if (!req.cookies.refresh_token) {
      return res.status(401).json({ error: 'Missing cookie' });
    }
    const tokenEncrypted = req.cookies.refresh_token;
    try {
      const userId = await this.tokenService.parseTokenAndGetUserId(
        tokenEncrypted,
      );
      this.generateTokensAndAuthenticateUser(res, userId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
