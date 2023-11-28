// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface XYZMetadataAccessControl {
    function canReadMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool);

    function canCreateMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool);

    function canUpdateMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool);

    function canDeleteMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool);
}
