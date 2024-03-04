import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/service';
import { UserInputDto } from 'src/auth/schema';

@Injectable()
export class AuthServices {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabase: SupabaseClient = this.supabaseService.getClient();

  async signIn(body: UserInputDto) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      ...body,
    });
    if (error) {
      throw new UnauthorizedException('Wrong password or email.');
    }

    return data.session.access_token;
  }

  async signUp(body: UserInputDto) {
    const { data: createdUser, error } = await this.supabase.auth.signUp({
      ...body,
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return createdUser;
  }

  async signOut(){
    const {error} = await this.supabase.auth.signOut()
    if(error){
      throw new BadRequestException()
    }
  }
}
