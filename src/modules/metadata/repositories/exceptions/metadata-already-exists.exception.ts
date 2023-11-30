import { MetadataId } from '../../domain/metadata';

export class MetadataAlreadyExistsException extends Error {
  constructor({ chain, contractAddress, entityId }: MetadataId) {
    super(
      `Metadata already exists for chain=${chain}, contractAddress=${contractAddress}, entityId=${entityId}`,
    );
  }
}
