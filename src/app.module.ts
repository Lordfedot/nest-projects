import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/module';
import { BookModule } from './books/module';

@Module({
  imports: [SupabaseModule, BookModule],
})
export class AppModule {}
