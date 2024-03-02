import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseService } from 'src/supabase/service';
import { BookDto } from './schema';

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

  async createBook(data: BookDto): Promise<any[]> {
    const { data: createdBook } = await this.supabase
      .from('books')
      .insert(data)
      .select();

    return createdBook;
  }

  async deleteBook(id: string) {
    const { data } = await this.supabase
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
