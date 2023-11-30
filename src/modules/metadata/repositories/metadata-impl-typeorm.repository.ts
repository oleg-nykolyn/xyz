import { Injectable } from '@nestjs/common';
import { MetadataRepository } from './metadata.repository';

@Injectable()
export class MetadataRepositoryImplTypeOrm implements MetadataRepository {}
