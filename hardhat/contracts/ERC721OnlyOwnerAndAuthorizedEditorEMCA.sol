// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import './EntityMetadataCrudAcl.sol';

contract ERC721OnlyOwnerAndAuthorizedEditorEMCA is
    ERC721,
    EntityMetadataCrudAcl
{
    constructor() ERC721('erc721-name', 'erc721-symbol') {
        for (uint256 i = 1; i <= 10; i++) {
            _mint(msg.sender, i);
        }
    }

    function canReadEntityMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        return ownerOf(entityId) == account;
    }

    function canCreateEntityMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        return ownerOf(entityId) == account;
    }

    function canUpdateEntityMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        return ownerOf(entityId) == account;
    }

    function canDeleteEntityMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        return ownerOf(entityId) == account;
    }
}
