import { Controller, Get, Param } from '@nestjs/common';
import { UserServices } from './service';

@Controller('users')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get(':email')
  async getUser(@Param('email') email: string) {
    const data = await this.userServices.getUser(email)
    return {message: 'Success', data}
  }
}
