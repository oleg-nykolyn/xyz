import { Module } from '@nestjs/common';
import { JwtService } from './services/jwt.service';
import { JwtServiceImpl } from './services/jwt-impl.service';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthServiceImpl } from './services/auth-impl.service';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: JwtService,
      useClass: JwtServiceImpl,
    },
  ],
})
export class AuthModule {}
