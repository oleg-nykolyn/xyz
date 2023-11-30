import { Controller, Get, UseFilters } from '@nestjs/common';
import { MetadataExceptionsFilter } from './metadata-exceptions.filter';

@Controller({
  version: '1',
  path: 'metadata',
})
@UseFilters(MetadataExceptionsFilter)
export class MetadataController {
  @Get()
  async getMetadata() {
    return {
      name: 'NestJS API',
      description: 'NestJS API',
      version: '1.0.0',
    };
  }
}
