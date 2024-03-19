import { MetadataId } from '../../domain/metadata';

export class MetadataNotFoundException extends Error {
  constructor(id: MetadataId) {
    super(
      `Metadata not found for chain=${id.getChain()}, contractAddress=${id.getContractAddress()}, entityId=${id.getEntityId()}`,
    );
  }
}
