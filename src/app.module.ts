import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { AclModule } from './modules/acl/acl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvUtils } from './utils/env.utils';
import { AccountTypeOrmEntity } from './modules/auth/repositories/typeorm/account.typeorm.entity';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MetadataEntity } from './modules/metadata/entities/metadata.entity';
import { MetadataOperationEntity } from './modules/metadata/entities/metadata-operation.entity';

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
      entities: [AccountTypeOrmEntity, MetadataEntity, MetadataOperationEntity],
      synchronize: EnvUtils.environmentType() === 'development',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: seconds(EnvUtils.rateLimiterThrottleTtlSecs()),
        limit: EnvUtils.rateLimiterThrottleLimit(),
      },
    ]),
    AuthModule,
    MetadataModule,
    AclModule,
  ],
})
export class AppModule {}
