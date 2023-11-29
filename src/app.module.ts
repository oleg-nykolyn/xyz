import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { AclModule } from './modules/acl/acl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvUtils } from './utils/env.utils';
import { Account } from './modules/auth/entities/account.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: EnvUtils.dbHost(),
      port: EnvUtils.dbPort(),
      username: EnvUtils.dbUser(),
      password: EnvUtils.dbPassword(),
      database: EnvUtils.dbName(),
      entities: [Account],
      synchronize: EnvUtils.environmentType() === 'development',
    }),
    AuthModule,
    MetadataModule,
    AclModule,
  ],
})
export class AppModule {}
