import { MetadataId } from './metadata';

export enum MetadataOperationType {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export class MetadataOperation {
  private constructor(
    private readonly type: MetadataOperationType,
    private readonly executedBy: string,
    private readonly metadataId: MetadataId,
    private readonly metadataContent: any,
    private readonly id?: string,
    private readonly executedAt?: Date,
  ) {}

  static of({
    type,
    executedBy,
    metadataId,
    metadataContent,
    id,
    executedAt,
  }: {
    type: MetadataOperationType;
    executedBy: string;
    metadataId: MetadataId;
    metadataContent: any;
    id?: string;
    executedAt?: Date;
  }): MetadataOperation {
    return new MetadataOperation(
      type,
      executedBy,
      metadataId,
      metadataContent,
      id,
      executedAt,
    );
  }

  getId(): string {
    return this.id;
  }

  getType(): MetadataOperationType {
    return this.type;
  }

  getExecutedAt(): Date {
    return this.executedAt;
  }

  getExecutedBy(): string {
    return this.executedBy;
  }

  getMetadataId(): MetadataId {
    return this.metadataId;
  }

  getMetadataContent(): any {
    return this.metadataContent;
  }
}
