import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { AclModule } from './modules/acl/acl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './utils/env.utils';
import { AccountTypeOrmEntity } from './modules/auth/repositories/typeorm/account.typeorm.entity';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MetadataTypeOrmEntity } from './modules/metadata/repositories/typeorm/entities/metadata.typeorm.entity';
import { MetadataOperationTypeOrmEntity } from './modules/metadata/repositories/typeorm/entities/metadata-operation.typeorm.entity';

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
      host: Env.dbHost(),
      port: Env.dbPort(),
      username: Env.dbUser(),
      password: Env.dbPassword(),
      database: Env.dbName(),
      entities: [
        AccountTypeOrmEntity,
        MetadataTypeOrmEntity,
        MetadataOperationTypeOrmEntity,
      ],
      synchronize: Env.environmentType() === 'development',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: seconds(Env.rateLimiterThrottleTtlSecs()),
        limit: Env.rateLimiterThrottleLimit(),
      },
    ]),
    AuthModule,
    MetadataModule,
    AclModule,
  ],
})
export class AppModule {}
