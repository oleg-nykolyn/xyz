import { Chain } from 'src/modules/acl/services/emca.service';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'entity_metadata' })
export class Metadata {
  @PrimaryColumn({
    type: 'enum',
    enum: Chain,
  })
  chain: Chain;

  @PrimaryColumn({ name: 'contract_address' })
  contractAddress: string;

  @PrimaryColumn({ name: 'entity_id' })
  entityId: number;

  @Column('simple-json')
  metadata: any;
}
