import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as MD_ACCESS_CONTROL_ABI from './solidity/abis/XYZMetadataAccessControl.json';
import { Env } from './utils/env';
import { ethers } from 'ethers';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  async onModuleInit() {
    const provider = new ethers.JsonRpcProvider(Env.rpcUrl());
    const contract = new ethers.Contract(
      '0x8a791620dd6260079bf849dc5567adc3f2fdc318',
      MD_ACCESS_CONTROL_ABI.abi,
      provider,
    );

    this.logger.log(
      await contract['canCreateMetadata'](
        '0x8a791620dd6260079bf849dc5567adc3f2fdc318',
        123,
      ),
    );
  }

  getHello(): string {
    return 'Hello World!';
  }
}
