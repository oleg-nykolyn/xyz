import { Controller, Get } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'metadata',
})
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
