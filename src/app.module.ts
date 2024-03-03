import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/module';
import { BookModule } from './books/module';
import { AuthModule } from './auth/module';
import { UserModule } from './user/module';

@Module({
  imports: [SupabaseModule, BookModule, AuthModule, UserModule],
})
export class AppModule {}
