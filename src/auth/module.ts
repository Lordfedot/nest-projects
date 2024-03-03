import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { config } from 'dotenv';

import { SupabaseModule } from 'src/supabase/module';
import { UserModule } from 'src/user/module';

import { AuthController } from './controller';
import { AuthServices } from './services';

config();
@Module({
  imports: [
    SupabaseModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServices],
})
export class AuthModule {}
