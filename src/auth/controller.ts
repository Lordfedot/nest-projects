import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthServices } from './services';
import { UserInputDto } from 'src/auth/schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServices) {}

  @Post('login')
  async signIn(@Body() body: UserInputDto) {
    const access_token = await this.authService.signIn(body);
    return { message: 'Success', access_token };
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() body: UserInputDto) {
    const { user } = await this.authService.signUp(body);
    return { message: 'Success', user };
  }
}
