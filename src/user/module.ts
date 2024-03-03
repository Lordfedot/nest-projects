import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserServices } from './service';
import { SupabaseModule } from 'src/supabase/module';

@Module({
  imports: [SupabaseModule],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices]
})
export class UserModule {}
