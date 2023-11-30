import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { AclModule } from './modules/acl/acl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvUtils } from './utils/env.utils';
import { Account } from './modules/auth/entities/account.entity';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Metadata } from './modules/metadata/entities/metadata.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: EnvUtils.dbHost(),
      port: EnvUtils.dbPort(),
      username: EnvUtils.dbUser(),
      password: EnvUtils.dbPassword(),
      database: EnvUtils.dbName(),
      entities: [Account, Metadata],
      synchronize: EnvUtils.environmentType() === 'development',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: seconds(EnvUtils.throttleTtlSecs()),
        limit: EnvUtils.throttleLimit(),
      },
    ]),
    AuthModule,
    MetadataModule,
    AclModule,
  ],
})
export class AppModule {}
