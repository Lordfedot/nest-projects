import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthServices } from './services';
import { UserDto } from 'src/user/schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServices) {}

  @Post('login')
  async signIn(@Body() body: Record<string, any>) {
    const result = await this.authService.signIn(body);
    return { message: 'Success', result };
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() body: UserDto) {
    const data = await this.authService.signUp(body);
    return { message: 'Success', data };
  }
}
