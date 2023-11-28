// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

interface EntityMetadataCrudAcl {
    function canReadEntityMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool);

    function canCreateEntityMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool);

    function canUpdateEntityMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool);

    function canDeleteEntityMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool);
}
