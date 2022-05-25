import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';

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

  @Get('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.cookie('refresh_token', '', { httpOnly: true });
    res.status(200).send();
  }
}
