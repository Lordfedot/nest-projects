import { JwtService } from '@nestjs/jwt';
import { UserServices } from './../user/service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/service';
import { UserDto } from 'src/user/schema';


@Injectable()
export class AuthServices {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly userServices: UserServices,
    private jwtService: JwtService
  ) {}

  private supabase: SupabaseClient = this.supabaseService.getClient();

  async signIn(body: Record<string, any>) {
    const user = await this.userServices.getUser(body.email);
    
    if (user.password !== body.password) {
      throw new UnauthorizedException('Wrong password.');
    }

    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(body: UserDto) {
    const { data: createdUser, error } = await this.supabase
      .from('users')
      .insert(body)
      .select();

    if (error) {
      throw new BadRequestException('User is already created.');
    }

    return createdUser;
  }
}
