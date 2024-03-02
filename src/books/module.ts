import { Module } from '@nestjs/common';
import { BookController } from './controller';
import { BookServices } from './services';
import { SupabaseModule } from 'src/supabase/module';

@Module({
  imports: [SupabaseModule],
  controllers: [BookController],
  providers: [BookServices],
})
export class BookModule {}
