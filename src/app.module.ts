import { Module } from '@nestjs/common';
import { MetadataAclModule } from './modules/metadata-acl/metadata-acl.module';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';

@Module({
  controllers: [],
  providers: [],
  imports: [MetadataAclModule, AuthModule, MetadataModule],
})
export class AppModule {}
