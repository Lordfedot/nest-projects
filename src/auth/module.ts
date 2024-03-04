import { Module } from '@nestjs/common';

import { SupabaseModule } from 'src/supabase/module';

import { AuthController } from './controller';
import { AuthServices } from './services';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [AuthServices],
})
export class AuthModule {}
