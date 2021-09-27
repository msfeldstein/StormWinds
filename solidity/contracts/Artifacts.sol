// //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Base64.sol";
import "./IERC2981Royalties.sol";
import "./ERC2981ContractWideRoyalties.sol";
import "./ArtifactSVGBuilder.sol";

// import "hardhat/console.sol";

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

interface ILoot {
    function ownerOf(uint256) external view returns (address);

    function getHead(uint256) external view returns (string memory);
}

contract Artifacts is Ownable, ERC721Enumerable, ERC2981ContractWideRoyalties {
    event ArtifactConjured();

    constructor(address _svgBuilder) ERC721("StormWinds Artifacts", "STORM") {
        _setRoyalties(msg.sender, 1000);
        svgBuilder = _svgBuilder;
    }

    uint256 constant MAX_PUBLIC_MINT = 4000;
    uint256 currentAvailability = 200;
    uint256 currentConjured = 1; // Leave space for owner to claim 0
    uint256 currentPrice = .12 ether;
    uint256 lootArtifactsConjured = 0;

    address lootAddress = 0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7;
    address svgBuilder;

    mapping(uint256 => bool) divineHoodsClaimed;

    string constant FIRE = "fire";
    string constant SAND = "sand";
    string constant ICE = "ice";
    string constant WIND = "wind";
    string constant LIGHTNING = "lightning";

    string[] private classification = [
        "ancient",
        "bright",
        "dark",
        "eldritch",
        "enlils",
        "loveless",
        "runic",
        "undead",
        "void"
    ];

    string[] private storm = ["fire", "ice", "lightning", "sand", "wind"];

    string[] private gear = [
        "amulet",
        "crystal"
        "gem",
        "helm",
        "plate",
        "seed",
        "shard",
        "sword"
    ];

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function pluck(
        uint256 tokenId,
        string memory keyPrefix,
        string[] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, toString(tokenId)))
        );

        string memory output = string(
            abi.encodePacked(sourceArray[rand % sourceArray.length])
        );

        return output;
    }

    function getClassification(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return pluck(tokenId, "CLASSIFICATION", classification);
    }

    function getStorm(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "STORM", storm);
    }

    function getGear(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "GEAR", gear);
    }

    function conjureArtifact() public payable {
        require(msg.value >= currentPrice, "destitution");
        _conjureNext();
    }

    // Owners of a divine hood can claim an artifact for free
    function conjureWithLoot(uint256 _lootTokenId) public {
        // Only 100 artifacts are available for free claiming
        require(lootArtifactsConjured < 100);
        // Only 1 artifact can be claimed with any hood
        require(!divineHoodsClaimed[_lootTokenId], "greed");

        ILoot loot = ILoot(lootAddress);
        // Ensure the token being used contains a Divine Hood
        string memory chest = loot.getHead(_lootTokenId);
        require(compareStrings(chest, "Divine Hood"));
        // Ensure the person trying to claim this actually owns it
        require(loot.ownerOf(_lootTokenId) == msg.sender, "lies");

        lootArtifactsConjured++;
        divineHoodsClaimed[_lootTokenId] = true;
        _conjureNext();
    }

    function _conjureNext() internal {
        require(currentConjured < currentAvailability, "dormancy");
        uint256 tokenId = currentConjured;
        currentConjured++;
        _safeMint(msg.sender, tokenId);
        emit ArtifactConjured();
    }

    function troveFor(address _adventurer)
        public
        view
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(_adventurer);
        uint256[] memory trove = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            trove[i] = tokenOfOwnerByIndex(_adventurer, i);
        }
        return trove;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        ArtifactSVGBuilder builder = ArtifactSVGBuilder(svgBuilder);
        return builder.svgForToken(tokenId);
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT license
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encode((a))) == keccak256(abi.encode((b))));
    }

    function hasHelm(address _adventurer, string calldata _type)
        public
        view
        returns (bool)
    {
        uint256 balance = balanceOf(_adventurer);
        for (uint256 i = 0; i < balance; i++) {
            uint256 token = tokenOfOwnerByIndex(_adventurer, i);
            if (token == 0) {
                return true;
            } else if (token < 4) {
                if (compareStrings(_type, FIRE)) return true;
            } else if (token < 7) {
                if (compareStrings(_type, SAND)) return true;
            } else if (token < 10) {
                if (compareStrings(_type, ICE)) return true;
            } else if (token < 13) {
                if (compareStrings(_type, WIND)) return true;
            } else if (token < 16) {
                if (compareStrings(_type, LIGHTNING)) return true;
            }
        }
        return false;
    }

    function makeAvailable(uint256 _max) external onlyOwner {
        require(_max <= MAX_PUBLIC_MINT);
        require(_max > currentAvailability);
        currentAvailability = _max;
    }

    function ownerClaim() external onlyOwner {
        _safeMint(msg.sender, 0); // Enlil Helm
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(IERC2981Royalties).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /// @dev Sets token royalties
    /// @param recipient recipient of the royalties
    /// @param value percentage (using 2 decimals - 10000 = 100, 0 = 0)
    function setRoyalties(address recipient, uint256 value) public onlyOwner {
        _setRoyalties(recipient, value);
    }

    function getCurrentPrice() external view returns (uint256) {
        return currentPrice;
    }

    function getCurrentAvailability() external view returns (uint256) {
        return currentAvailability;
    }

    function getCurrentConjured() external view returns (uint256) {
        return currentConjured;
    }

    function setLootAddress(address _loot) public onlyOwner {
        lootAddress = _loot;
    }

    function setSVGBuilderAddress(address _svgBuilder) public onlyOwner {
        svgBuilder = _svgBuilder;
    }
}
