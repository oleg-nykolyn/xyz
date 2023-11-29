import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtServiceImpl } from './jwt-impl.service';

@Module({
  providers: [
    {
      provide: JwtService,
      useClass: JwtServiceImpl,
    },
  ],
})
export class AuthModule {}
