// //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Base64.sol";

contract ArtifactSVGBuilder {
    function svgForStrings(
        uint256 tokenId,
        string memory classification,
        string memory storm,
        string memory gear
    ) public pure returns (string memory) {
        string[5] memory nameParts;
        nameParts[0] = classification;
        nameParts[1] = " ";
        nameParts[2] = storm;
        nameParts[3] = " ";
        nameParts[4] = gear;
        string memory name = string(
            abi.encodePacked(
                nameParts[0],
                nameParts[1],
                nameParts[2],
                nameParts[3],
                nameParts[4]
            )
        );
        string memory svg = string(
            abi.encodePacked("<svg><text>", name, "</text></svg>")
        );
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Artifact #',
                        toString(tokenId),
                        ": ",
                        name,
                        '", "description": "StormWinds artifacts are used to control the storms throughout the realms.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '", "attributes": [{"classification": "',
                        nameParts[0],
                        '", "storm": "',
                        nameParts[2],
                        '", "object": "',
                        nameParts[4],
                        '"}]}'
                    )
                )
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", json));
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
}
