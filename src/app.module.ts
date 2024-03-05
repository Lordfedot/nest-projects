import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/module';
import { BookModule } from './books/module';
import { AuthModule } from './auth/module';
import { FileModule } from './file/module';

@Module({
  imports: [SupabaseModule, BookModule, AuthModule, FileModule],
})
export class AppModule {}
