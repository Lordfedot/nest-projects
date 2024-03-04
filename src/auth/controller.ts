import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthServices } from './services';
import { UserInputDto } from 'src/auth/schema';
import { AuthGuard } from './guard';

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

  @Post('logout')
  async signOut() {
    await this.authService.signOut();
    return { message: 'success' };
  }
}
