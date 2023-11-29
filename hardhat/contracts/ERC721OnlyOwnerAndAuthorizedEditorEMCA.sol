// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './EntityMetadataCrudAcl.sol';

contract ERC721OnlyOwnerAndAuthorizedEditorEMCA is
    ERC721,
    Ownable,
    EntityMetadataCrudAcl
{
    mapping(address => mapping(uint256 => bool))
        private _entityMetadataAuthorizedEditors;

    constructor() ERC721('erc721-name', 'erc721-symbol') Ownable(msg.sender) {
        // Mint 10 tokens for msg.sender.
        for (uint256 i = 0; i < 10; i++) {
            _mint(msg.sender, i);

            // Set owner as authorized editor for all tokens.
            _entityMetadataAuthorizedEditors[msg.sender][i] = true;
        }
    }

    function canReadEntityMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        // Only owner can read token metadata.
        return ownerOf(entityId) == account;
    }

    function canCreateEntityMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        // Only authorized editor can create token metadata.
        return _entityMetadataAuthorizedEditors[account][entityId];
    }

    function canUpdateEntityMetadata(
        address account,
        uint256 entityId
    ) external pure override returns (bool) {
        // No one can update token metadata.
        return false;
    }

    function canDeleteEntityMetadata(
        address account,
        uint256 entityId
    ) external pure override returns (bool) {
        // No one can delete token metadata.
        return false;
    }

    function setEntityMetadataAuthorizedEditor(
        address account,
        uint256 entityId,
        bool status
    ) external onlyOwner {
        _entityMetadataAuthorizedEditors[account][entityId] = status;
    }
}
