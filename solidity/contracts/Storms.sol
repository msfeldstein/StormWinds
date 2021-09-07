//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Storms is Ownable {
    enum StormType {
        FIRE,
        SAND,
        ICE,
        WIND,
        LIGHTNING
    }
    event StormBegins(StormType);
    // The dates that the storms are active until
    mapping(uint8 => uint256) activeStormMapping;

    function activeStorms()
        external
        view
        returns (
            bool, // fire
            bool, // sand
            bool, // ice
            bool, // wind
            bool // lightning
        )
    {
        return (
            activeStormMapping[uint8(StormType.FIRE)] > block.timestamp,
            activeStormMapping[uint8(StormType.SAND)] > block.timestamp,
            activeStormMapping[uint8(StormType.ICE)] > block.timestamp,
            activeStormMapping[uint8(StormType.WIND)] > block.timestamp,
            activeStormMapping[uint8(StormType.LIGHTNING)] > block.timestamp
        );
    }

    function activate(StormType _storm, uint256 _endTime) external {
        require(_endTime > block.timestamp);
        activeStormMapping[uint8(_storm)] = _endTime;
        emit StormBegins(_storm);
    }
}
