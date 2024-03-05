import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/supabase/module';
import { FileController } from './controller';
import { FileServices } from './services';

@Module({
  imports: [SupabaseModule],
  controllers: [FileController],
  providers: [FileServices],
})
export class FileModule {}
