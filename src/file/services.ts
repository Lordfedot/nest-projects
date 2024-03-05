import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/service';

@Injectable()
export class FileServices {
  constructor(private readonly supabaseService: SupabaseService) {}
  private supabase: SupabaseClient = this.supabaseService.getClient();

  async uploadImages(file: Express.Multer.File) {
    const { data, error } = await this.supabase.storage
      .from('images')
      .upload(`images-${file.originalname}`, file.buffer, {
        cacheControl: '3400',
        upsert: false,
      });
    if (error) {
      throw new BadRequestException(error);
    }
    return data;
  }
}
