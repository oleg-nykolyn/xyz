import { MetadataId } from '../../domain/metadata';

export class MetadataNotFoundException extends Error {
  constructor({ chain, contractAddress, entityId }: MetadataId) {
    super(
      `Metadata not found for chain=${chain}, contractAddress=${contractAddress}, entityId=${entityId}`,
    );
  }
}
