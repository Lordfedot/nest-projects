import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';

import { SupabaseModule } from 'src/supabase/module';

import { AuthController } from './controller';
import { AuthServices } from './services';
config();

@Module({
  imports: [
    SupabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServices],
})
export class AuthModule {}
