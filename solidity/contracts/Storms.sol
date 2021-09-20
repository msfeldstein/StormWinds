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
import "./Artifacts.sol";

// import "hardhat/console.sol";

contract Storms is Ownable {
    address lootAddress = 0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7;
    address artifactAddress;

    // The dates that the storms are active until
    mapping(string => uint256) activeStormMapping;

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
            activeStormMapping["FIRE"] > block.timestamp,
            activeStormMapping["SAND"] > block.timestamp,
            activeStormMapping["ICE"] > block.timestamp,
            activeStormMapping["WIND"] > block.timestamp,
            activeStormMapping["LIGHTNING"] > block.timestamp
        );
    }

    function stormIsActive(string calldata _stormName)
        public
        view
        returns (bool)
    {}

    function compareStrings(string calldata a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function summon(string calldata _storm, uint256 _endTime) external {
        require(_endTime > block.timestamp);
        Artifacts artifacts = Artifacts(artifactAddress);
        require(artifacts.hasHelm(msg.sender, "fire"), "powerless");
        require(
            compareStrings(_storm, "FIRE") ||
                compareStrings(_storm, "SAND") ||
                compareStrings(_storm, "ICE") ||
                compareStrings(_storm, "WIND") ||
                compareStrings(_storm, "LIGHTNING")
        );
        activeStormMapping[_storm] = _endTime;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
