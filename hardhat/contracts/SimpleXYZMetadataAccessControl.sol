// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract SimpleXYZMetadataAccessControl {
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
