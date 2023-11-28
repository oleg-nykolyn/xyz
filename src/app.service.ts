import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { abi } from './solidity/abis/XYZMetadataAccessControl.json';
import { Env } from './utils/env';
import { ethers } from 'ethers';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  async onModuleInit() {
    const contract = new ethers.Contract(
      '0x5fbdb2315678afecb367f032d93f642f64180aa3',
      abi,
      new ethers.JsonRpcProvider(Env.rpcUrl()),
    );

    this.logger.log(
      await contract.canCreateMetadata(
        '0x8a791620dd6260079bf849dc5567adc3f2fdc318',
        123,
      ),
    );
  }

  getHello(): string {
    return 'Hello World!';
  }
}
