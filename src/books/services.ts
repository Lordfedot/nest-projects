import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseService } from 'src/supabase/service';
import { BookDto } from './schema';
import { JwtPayload } from 'src/interfaces';

@Injectable()
export class BookServices {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabase: SupabaseClient = this.supabaseService.getClient();

  async getAllBooks() {
    const { data } = await this.supabase.from('books').select();

    if (!data || data.length === 0) {
      throw new NotFoundException();
    }
    return data;
  }

  async getBook(id: string) {
    const { data } = await this.supabase.from('books').select().eq('id', id);
    if (!data || data.length === 0) {
      throw new NotFoundException();
    }
    return data;
  }

  async createBook(data: BookDto) {
    const { data: createdBook, error } = await this.supabase
      .from('books')
      .insert(data)
      .select();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return createdBook;
  }

  async deleteBook(id: string, user: JwtPayload) {
    const { data, error } = await this.supabase
      .from('books')
      .delete()
      .eq('id', id)
      .select();

    if (!data || data.length === 0) {
      throw new NotFoundException();
    }
  }

  async updateBook(id: string, body: any) {
    const { data } = await this.supabase
      .from('books')
      .update(body)
      .eq('id', id)
      .select();
    if (!data || data.length === 0) {
      throw new NotFoundException();
    }
    return data;
  }
}
