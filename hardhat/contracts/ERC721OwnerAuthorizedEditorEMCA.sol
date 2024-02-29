// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './IEntityMetadataCrudAcl.sol';

contract ERC721OwnerAuthorizedEditorEMCA is
    ERC721,
    Ownable,
    IEntityMetadataCrudAcl
{
    mapping(address => mapping(uint256 => bool))
        private _entityMetadataAuthorizedEditors;

    constructor() ERC721('erc721-name', 'erc721-symbol') Ownable(msg.sender) {
        // Mint 10 tokens for msg.sender.
        for (uint256 i = 0; i < 10; i++) {
            _mint(msg.sender, i);

            // Set msg.sender as authorized editor for all tokens.
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
    ) external view override returns (bool) {
        // Only authorized editor can edit token metadata.
        return _entityMetadataAuthorizedEditors[account][entityId];
    }

    function canDeleteEntityMetadata(
        address account,
        uint256 entityId
    ) external view override returns (bool) {
        // Only authorized editor can delete token metadata.
        return _entityMetadataAuthorizedEditors[account][entityId];
    }

    function setEntityMetadataAuthorizedEditor(
        address account,
        uint256 entityId,
        bool status
    ) external onlyOwner {
        _entityMetadataAuthorizedEditors[account][entityId] = status;
    }
}
