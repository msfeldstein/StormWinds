// //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Artifacts.sol";

import "hardhat/console.sol";

contract TestArtifacts is Artifacts {
    constructor(address svgBuilder) Artifacts(svgBuilder) {}

    function mintToken(uint256 _tokenId) public {
        _safeMint(msg.sender, _tokenId);
    }
}
