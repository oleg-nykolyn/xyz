import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';

@Module({
  controllers: [],
  providers: [],
  imports: [AuthModule, MetadataModule],
})
export class AppModule {}
