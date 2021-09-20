// //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

//  __ _                      __    __ _           _
// / _\ |_ ___  _ __ _ __ ___/ / /\ \ (_)_ __   __| |___
// \ \| __/ _ \| '__| '_ ` _ \ \/  \/ / | '_ \ / _` / __|
// _\ \ || (_) | |  | | | | | \  /\  /| | | | | (_| \__ \
// \__/\__\___/|_|  |_| |_| |_|\/  \/ |_|_| |_|\__,_|___/
//    _        _   _  __            _
//   /_\  _ __| |_(_)/ _| __ _  ___| |_ ___
//  //_\\| '__| __| | |_ / _` |/ __| __/ __|
// /  _  \ |  | |_| |  _| (_| | (__| |_\__ \
// \_/ \_/_|   \__|_|_|  \__,_|\___|\__|___/
// Summoned by @msfeldstein

contract Artifacts is Ownable, ERC721Enumerable {
    constructor() ERC721("StormWinds Artifacts", "STORM") {}

    uint8 constant totalHelms = 16;

    uint8 helmsConjured = 1; // Start at 1 to leave space for owner claim
    uint256 shardsConjured = 1;

    /*
Mints a random helm
There are 3 helms for each of the storm types and one wild helm that can act on any storm
Each Helm costs 1 eth
0: Helm of Enlil (acts on any storm type)
1,2,3 fire
4,5,6 sand
7,8,9 ice
10,11,12 wind
13,14,15 lightning
*/
    function conjureHelm() external payable {
        require(helmsConjured < totalHelms, "all helms have been conjured");
        require(msg.value >= nextHelmPrice(), "not enough ether tithed");
        _safeMint(msg.sender, helmsConjured);
        console.log("Conjured helm for ", msg.sender);
        helmsConjured++;
    }

    function nextHelmPrice() public pure returns (uint256) {
        // 1e18 is wei->ether.  Is there a more robust way to write this?
        // return helmsConjured * 1e18;
        return 1 ether;
    }

    function compareStrings(string calldata a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function hasHelm(
        address _adventurer,
        string calldata _type
    ) public view returns (bool) {
        uint256 balance = balanceOf(_adventurer);
        for (uint i = 0; i < balance; i++) {
            uint token = tokenOfOwnerByIndex(_adventurer, i);
            console.log("Checking token", token);
            if (token == 0) {
                return true;
            } else if (token < 4) {
                if (compareStrings(_type, "fire")) return true;
            } else if (token < 7) {
                if (compareStrings(_type, "sand")) return true;
            } else if (token < 10) {
                if (compareStrings(_type, "ice")) return true;
            } else if (token < 13) {
                if (compareStrings(_type, "wind")) return true;
            } else if (token < 16) {
                if (compareStrings(_type, "lightning")) return true;
            }
        }
        return false;
    }

    // function hasShard(address _adventurer, string calldata storm) {

    // }

    /*
conjureShard will mint a random shard
each shard ID determines what storm it acts on based on its modulo of 6
id % 6 = 0: enlil (wild, acts on any storm type)
id % 6 = 1: fire
id % 6 = 2: sand
id % 6 = 3: ice
id % 6 = 4: wind
id % 6 = 5: lightning

so the shard with id 97 would be a fire shard because 97 % 6 == 1,
while id 102 would be a wild shard since 102 % 6 == 0

shard IDs start after all the ids available for helms
*/
    function conjureShard() external payable {
        require(helmsConjured < 1000, "all shards have been conjured");
        require(
            msg.value >= nextShardPrice(),
            "not enough ether to conjure a shard"
        );
        _safeMint(msg.sender, totalHelms + shardsConjured);
        shardsConjured++;
    }

    function nextShardPrice() public pure returns (uint256) {
        return 0.2 ether;
    }

    function ownerClaim() external onlyOwner {
        _safeMint(msg.sender, 0); // Enlil Helm
        _safeMint(msg.sender, totalHelms); // Enlil Shard
    }
}
