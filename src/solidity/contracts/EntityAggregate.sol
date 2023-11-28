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

contract SimpleXYZMetadataAccessControl is XYZMetadataAccessControl {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function canReadMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool) {
        return account == owner;
    }

    function canCreateMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool) {
        return account == owner;
    }

    function canUpdateMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool) {
        return account == owner;
    }

    function canDeleteMetadata(
        address account,
        uint256 entityId
    ) external view returns (bool) {
        return account == owner;
    }
}
