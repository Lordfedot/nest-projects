import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/service';
import { ReturnUserDto } from 'src/interfaces';

@Injectable()
export class UserServices {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabase: SupabaseClient = this.supabaseService.getClient();

  async getUser(email: string) {
    const { data } = await this.supabase
      .from('users')
      .select()
      .eq('email', email);

    if (!data || data.length === 0) {
      throw new BadRequestException();
    }
    return data[0] as ReturnUserDto;
  }
}
