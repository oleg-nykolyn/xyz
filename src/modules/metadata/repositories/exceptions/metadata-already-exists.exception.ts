import { MetadataId } from '../../domain/metadata';

export class MetadataAlreadyExistsException extends Error {
  constructor(id: MetadataId) {
    super(
      `Metadata already exists for chain=${id.getChain()}, contractAddress=${id.getContractAddress()}, entityId=${id.getEntityId()}`,
    );
  }
}
