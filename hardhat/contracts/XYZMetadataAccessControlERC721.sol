// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import './XYZMetadataAccessControl.sol';

contract XYZMetadataAccessControlERC721 is ERC721, XYZMetadataAccessControl {
    constructor() ERC721('erc721-name', 'erc721-symbol') {
        for (uint256 i = 1; i <= 10; i++) {
            _mint(msg.sender, i);
        }
    }

    function canReadMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        return ownerOf(entityId) == account;
    }

    function canCreateMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        return ownerOf(entityId) == account;
    }

    function canUpdateMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        return ownerOf(entityId) == account;
    }

    function canDeleteMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        return ownerOf(entityId) == account;
    }
}
