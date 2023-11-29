import { Module } from '@nestjs/common';
import { JwtService } from './services/jwt.service';
import { JwtServiceImpl } from './services/jwt-impl.service';

@Module({
  providers: [
    {
      provide: JwtService,
      useClass: JwtServiceImpl,
    },
  ],
})
export class AuthModule {}
