import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

  async createBook(data: BookDto, userId: string) {
    const book = { ...data, user_id: userId };
    const { data: createdBook, error } = await this.supabase
      .from('books')
      .insert(book)
      .select();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return createdBook;
  }

  async deleteBook(id: string, userId: string) {
    const { data: bookToDelete } = await this.supabase
      .from('books')
      .select()
      .eq('id', id)
      .single();
    if (!bookToDelete) {
      throw new NotFoundException('Book with this ID is not found.');
    }
    if (bookToDelete.user_id !== userId) {
      throw new ForbiddenException('Forbidden action for this user.');
    }

    const { error } = await this.supabase
      .from('books')
      .delete()
      .eq('id', id)
      .select();
    if (error) {
      throw new BadRequestException(error);
    }
  }

  async updateBook(id: string, body: any, userId: string) {
    const { data: bookToUpdate } = await this.supabase
      .from('books')
      .select()
      .eq('id', id)
      .single();
    if (!bookToUpdate) {
      throw new NotFoundException('Book with this ID is not found.');
    }
    if (bookToUpdate.user_id !== userId) {
      throw new ForbiddenException('Forbidden action for this user.');
    }
    
    const { data, error } = await this.supabase
      .from('books')
      .update(body)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (!data) {
      throw new NotFoundException('Book with this ID is not found.');
    }
    return data;
  }
}
