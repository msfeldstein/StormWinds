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

import "hardhat/console.sol";

contract Storms is Ownable {
    event StormBegins(string storm);
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
            activeStormMapping["fire"] > block.timestamp,
            activeStormMapping["sand"] > block.timestamp,
            activeStormMapping["ice"] > block.timestamp,
            activeStormMapping["wind"] > block.timestamp,
            activeStormMapping["lightning"] > block.timestamp
        );
    }

    function stormIsActive(string calldata _stormName)
        public
        view
        returns (bool)
    {
        return activeStormMapping[_stormName] > block.timestamp;
    }

    function compareStrings(string calldata a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function summon(string calldata _storm, uint256 _endTime) external {
        require(_endTime > block.timestamp, "temporal");
        require(
            compareStrings(_storm, "fire") ||
                compareStrings(_storm, "sand") ||
                compareStrings(_storm, "ice") ||
                compareStrings(_storm, "wind") ||
                compareStrings(_storm, "lightning"),
            "mystery"
        );
        Artifacts artifacts = Artifacts(artifactAddress);
        bool canSummon = false;
        uint256 tokenBalance = artifacts.balanceOf(msg.sender);
        for (uint256 i = 0; i < tokenBalance; i++) {
            uint256 tokenId = artifacts.tokenOfOwnerByIndex(msg.sender, i);
            string memory stormForToken = artifacts.getStorm(tokenId);
            if (compareStrings(_storm, stormForToken)) {
                canSummon = true;
            }
        }
        require(canSummon, "powerless");
        console.log("Summoning", _storm, _endTime);
        activeStormMapping[_storm] = _endTime;
        emit StormBegins(_storm);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
