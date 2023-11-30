import { Injectable } from '@nestjs/common';
import { MetadataRepository } from './metadata.repository';

@Injectable()
export class MetadataRepositoryImpl implements MetadataRepository {}
