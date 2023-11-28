import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { AclModule } from './modules/acl/acl.module';

@Module({
  controllers: [],
  providers: [],
  imports: [AuthModule, MetadataModule, AclModule],
})
export class AppModule {}
