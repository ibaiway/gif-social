import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.authService.signup(createUserDto, res);
  }

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.authService.login(createUserDto, res);
  }
}
