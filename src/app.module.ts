import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { AclModule } from './modules/acl/acl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './utils/env';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Env.dbHost(),
      port: Env.dbPort(),
      username: Env.dbUser(),
      password: Env.dbPassword(),
      database: Env.dbName(),
      entities: [],
      synchronize: true,
    }),
    AuthModule,
    MetadataModule,
    AclModule,
  ],
})
export class AppModule {}
