//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//  __ _                      __    __ _           _
// / _\ |_ ___  _ __ _ __ ___/ / /\ \ (_)_ __   __| |___
// \ \| __/ _ \| '__| '_ ` _ \ \/  \/ / | '_ \ / _` / __|
// _\ \ || (_) | |  | | | | | \  /\  /| | | | | (_| \__ \
// \__/\__\___/|_|  |_| |_| |_|\/  \/ |_|_| |_|\__,_|___/
// summoned by @msfeldstein
//

import "@openzeppelin/contracts/access/Ownable.sol";

// import "hardhat/console.sol";

contract Storms is Ownable {
    address lootAddress = 0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7;
    address artifactAddress;

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

    constructor(address _artifactAdress) {
        artifactAddress = _artifactAdress;
    }

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

    function summon(StormType _storm, uint256 _endTime) external {
        require(_endTime > block.timestamp);
        activeStormMapping[uint8(_storm)] = _endTime;
        emit StormBegins(_storm);
    }

    function pray(StormType _storm) external {
        //sdfa
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
