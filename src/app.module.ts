import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/module';
import { BookModule } from './books/module';
import { AuthModule } from './auth/module';

@Module({
  imports: [SupabaseModule, BookModule, AuthModule],
})
export class AppModule {}
