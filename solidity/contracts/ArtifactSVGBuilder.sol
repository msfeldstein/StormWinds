// //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ArtifactSVGBuilder {
    function pluck(
        uint256 tokenId,
        string memory keyPrefix,
        string[5] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, toString(tokenId)))
        );

        string memory output = string(
            abi.encodePacked(sourceArray[rand % sourceArray.length])
        );

        return output;
    }

    function pluck(
        uint256 tokenId,
        string memory keyPrefix,
        string[7] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, toString(tokenId)))
        );

        string memory output = string(
            abi.encodePacked(sourceArray[rand % sourceArray.length])
        );

        return output;
    }

    function pluck(
        uint256 tokenId,
        string memory keyPrefix,
        string[9] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, toString(tokenId)))
        );

        string memory output = string(
            abi.encodePacked(sourceArray[rand % sourceArray.length])
        );

        return output;
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

    function getClassification(uint256 tokenId)
        public
        pure
        returns (string memory)
    {
        return pluck(tokenId, "CLASSIFICATION", classification());
    }

    function getStorm(uint256 tokenId) public pure returns (string memory) {
        return pluck(tokenId, "STORM", storm());
    }

    function getGear(uint256 tokenId) public pure returns (string memory) {
        return pluck(tokenId, "GEAR", gear());
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function svgForToken(uint256 _tokenId) public pure returns (string memory) {
        string[5] memory nameParts;
        nameParts[0] = getClassification(_tokenId);
        nameParts[1] = " ";
        nameParts[2] = getStorm(_tokenId);
        nameParts[3] = " ";
        nameParts[4] = getGear(_tokenId);
        string memory name = string(
            abi.encodePacked(
                nameParts[0],
                nameParts[1],
                nameParts[2],
                nameParts[3],
                nameParts[4]
            )
        );
        return string(abi.encodePacked("<svg><text>", name, "</text></svg>"));
        // string
        //     memory prefix = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: black; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';
        // string memory suffix = "</text>";
        // string memory classificationText = string(
        //     abi.encodePacked(
        //         '<path transform="translate(10, 20)" d="',
        //         ArtifactSVGBuilder.classificationSVGs()[
        //             getClassificationIdx(tokenId)
        //         ],
        //         '" fill="white" />'
        //     )
        // );

        // string memory stormText = string(
        //     abi.encodePacked(
        //         '<path transform="translate(10, 60)" d="',
        //         ArtifactSVGBuilder.stormSVGs()[getStormIdx(tokenId)],
        //         '" fill="white" />'
        //     )
        // );

        // string memory gearText = string(
        //     abi.encodePacked(
        //         '<path transform="translate(10, 100)" d="',
        //         ArtifactSVGBuilder.gearSVGs()[getGearIdx(tokenId)],
        //         '" fill="white" />'
        //     )
        // );

        // string memory closingTag = "</svg>";

        // string memory output = string(
        //     abi.encodePacked(
        //         prefix,
        //         name,
        //         suffix,
        //         classificationText,
        //         stormText,
        //         gearText,
        //         closingTag
        //     )
        // );
        // console.log(output, "Output");
        // string memory json = Base64.encode(
        //     bytes(
        //         string(
        //             abi.encodePacked(
        //                 '{"name": "Artifact #',
        //                 toString(tokenId),
        //                 ": ",
        //                 name,
        //                 '", "description": "StormWinds artifacts are used to control the storms throughout the realms.", "image": "data:image/svg+xml;base64,',
        //                 Base64.encode(bytes(output)),
        //                 '", "attributes": [{"classification": "',
        //                 nameParts[0],
        //                 '", "storm": "',
        //                 nameParts[2],
        //                 '", "object": "',
        //                 nameParts[4],
        //                 '"}]}'
        //             )
        //         )
        //     )
        // );
        // output = string(
        //     abi.encodePacked("data:application/json;base64,", json)
        // );

        // return output;
    }

    function classification() internal pure returns (string[9] memory) {
        return [
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
    }

    function storm() internal pure returns (string[5] memory) {
        return ["fire", "ice", "lightning", "sand", "wind"];
    }

    function gear() internal pure returns (string[7] memory) {
        return [
            "amulet",
            "crystal"
            "gem",
            "helm",
            "plate",
            "seed",
            "shard",
            "sword"
        ];
    }

    function classificationSVGs() internal pure returns (string[9] memory) {
        return [
            /* Ancient */
            "M0 28V8H4V4H8V0H20V4H24V8H28V28H20V20H8V28H0ZM8 16H20V8H16V4H12V8H8V16ZM32 28V8H56V12H60V28H52V12H40V28H32ZM68 28V24H64V12H68V8H92V12H72V24H92V28H68ZM108 4V0H116V4H108ZM100 28V24H108V12H104V8H116V24H124V28H100ZM132 28V24H128V12H132V8H152V12H156V20H136V24H152V28H132ZM136 16H148V12H136V16ZM160 28V8H184V12H188V28H180V12H168V28H160ZM204 28V12H196V8H204V0H212V8H220V12H212V28H204Z",
            /* Bright */
            "M0 28V0H24V4H28V12H24V16H28V24H24V28H0ZM8 12H20V4H8V12ZM8 24H20V16H8V24ZM44 12H48V16H44V28H36V8H44V12ZM60 8V12H48V8H60ZM76 4V0H84V4H76ZM68 28V24H76V12H72V8H84V24H92V28H68ZM100 32V28H116V24H100V20H96V12H100V8H124V28H120V32H100ZM104 20H116V12H104V20ZM128 28V0H136V8H152V12H156V28H148V12H136V28H128ZM172 28V12H164V8H172V0H180V8H188V12H180V28H172Z",
            /* Dark */
            "M0 28V0H20V4H24V8H28V20H24V24H20V28H0ZM8 24H16V20H20V8H16V4H8V24ZM36 28V24H32V20H36V16H52V12H36V8H56V12H60V28H36ZM40 24H52V20H40V24ZM76 12H80V16H76V28H68V8H76V12ZM92 8V12H80V8H92ZM96 28V0H104V16H112V12H116V8H124V12H120V16H116V20H120V24H124V28H116V24H112V20H104V28H96Z",
            /* Eldritch */
            "M0 28V0H28V4H8V12H24V16H8V24H28V28H0ZM36 28V24H44V4H40V0H52V24H60V28H36ZM68 28V24H64V12H68V8H84V0H92V28H68ZM72 24H84V12H72V24ZM108 12H112V16H108V28H100V8H108V12ZM124 8V12H112V8H124ZM140 4V0H148V4H140ZM132 28V24H140V12H136V8H148V24H156V28H132ZM172 28V12H164V8H172V0H180V8H188V12H180V28H172ZM196 28V24H192V12H196V8H220V12H200V24H220V28H196ZM224 28V0H232V8H248V12H252V28H244V12H232V28H224Z",
            /* Enlils */
            "M0 28V0H28V4H8V12H24V16H8V24H28V28H0ZM32 28V8H56V12H60V28H52V12H40V28H32ZM68 28V24H76V4H72V0H84V24H92V28H68ZM108 4V0H116V4H108ZM100 28V24H108V12H104V8H116V24H124V28H100ZM132 28V24H140V4H136V0H148V24H156V28H132ZM160 28V24H180V20H164V16H160V12H164V8H184V12H168V16H184V20H188V24H184V28H160Z",
            /* Loveless */
            "M0 28V0H8V24H24V28H0ZM32 28V24H28V12H32V8H52V12H56V24H52V28H32ZM36 24H48V12H36V24ZM72 28V24H68V20H64V8H72V20H80V8H88V20H84V24H80V28H72ZM96 28V24H92V12H96V8H116V12H120V20H100V24H116V28H96ZM100 16H112V12H100V16ZM128 28V24H136V4H132V0H144V24H152V28H128ZM160 28V24H156V12H160V8H180V12H184V20H164V24H180V28H160ZM164 16H176V12H164V16ZM188 28V24H208V20H192V16H188V12H192V8H212V12H196V16H212V20H216V24H212V28H188ZM220 28V24H240V20H224V16H220V12H224V8H244V12H228V16H244V20H248V24H244V28H220Z",
            /* Runic */
            "M0 28V0H24V4H28V16H20V20H24V24H28V28H16V24H12V20H8V28H0ZM8 16H16V12H20V4H8V16ZM36 28V24H32V8H40V24H52V8H60V28H36ZM64 28V8H88V12H92V28H84V12H72V28H64ZM108 4V0H116V4H108ZM100 28V24H108V12H104V8H116V24H124V28H100ZM132 28V24H128V12H132V8H156V12H136V24H156V28H132Z",
            /* Undead */
            "M4 28V24H0V0H8V24H20V0H28V24H24V28H4ZM32 28V8H56V12H60V28H52V12H40V28H32ZM68 28V24H64V12H68V8H84V0H92V28H68ZM72 24H84V12H72V24ZM100 28V24H96V12H100V8H120V12H124V20H104V24H120V28H100ZM104 16H116V12H104V16ZM132 28V24H128V20H132V16H148V12H132V8H152V12H156V28H132ZM136 24H148V20H136V24ZM164 28V24H160V12H164V8H180V0H188V28H164ZM168 24H180V12H168V24Z",
            /* Void */
            "M12 28V24H8V20H4V16H0V0H8V12H12V16H16V12H20V0H28V16H24V20H20V24H16V28H12ZM36 28V24H32V12H36V8H56V12H60V24H56V28H36ZM40 24H52V12H40V24ZM76 4V0H84V4H76ZM68 28V24H76V12H72V8H84V24H92V28H68ZM100 28V24H96V12H100V8H116V0H124V28H100ZM104 24H116V12H104V24Z"
        ];
    }

    function stormSVGs() internal pure returns (string[5] memory) {
        return [
            /* Fire */
            "M0 28V0H28V4H8V12H24V16H8V28H0ZM44 4V0H52V4H44ZM36 28V24H44V12H40V8H52V24H60V28H36ZM76 12H80V16H76V28H68V8H76V12ZM92 8V12H80V8H92ZM100 28V24H96V12H100V8H120V12H124V20H104V24H120V28H100ZM104 16H116V12H104V16Z",
            /* Ice */
            "M0 28V24H8V4H0V0H24V4H16V24H24V28H0ZM32 28V24H28V12H32V8H56V12H36V24H56V28H32ZM64 28V24H60V12H64V8H84V12H88V20H68V24H84V28H64ZM68 16H80V12H68V16Z",
            /* Lightning */
            "M0 28V0H8V24H24V28H0ZM40 4V0H48V4H40ZM32 28V24H40V12H36V8H48V24H56V28H32ZM64 32V28H80V24H64V20H60V12H64V8H88V28H84V32H64ZM68 20H80V12H68V20ZM92 28V0H100V8H116V12H120V28H112V12H100V28H92ZM136 28V12H128V8H136V0H144V8H152V12H144V28H136ZM156 28V8H180V12H184V28H176V12H164V28H156ZM200 4V0H208V4H200ZM192 28V24H200V12H196V8H208V24H216V28H192ZM220 28V8H244V12H248V28H240V12H228V28H220ZM256 32V28H272V24H256V20H252V12H256V8H280V28H276V32H256ZM260 20H272V12H260V20Z",
            /* Sand */
            "M4 28V24H0V20H8V24H20V16H4V12H0V4H4V0H24V4H28V8H20V4H8V12H24V16H28V24H24V28H4ZM36 28V24H32V20H36V16H52V12H36V8H56V12H60V28H36ZM40 24H52V20H40V24ZM64 28V8H88V12H92V28H84V12H72V28H64ZM100 28V24H96V12H100V8H116V0H124V28H100ZM104 24H116V12H104V24Z",
            /* Wind */
            "M4 28V24H0V0H8V16H12V0H16V16H20V0H28V24H24V28H20V24H16V20H12V24H8V28H4ZM44 4V0H52V4H44ZM36 28V24H44V12H40V8H52V24H60V28H36ZM64 28V8H88V12H92V28H84V12H72V28H64ZM100 28V24H96V12H100V8H116V0H124V28H100ZM104 24H116V12H104V24Z"
        ];
    }

    function gearSVGs() internal pure returns (string[8] memory) {
        return [
            /* Amulet */
            "M0 28V8H4V4H8V0H20V4H24V8H28V28H20V20H8V28H0ZM8 16H20V8H16V4H12V8H8V16ZM32 28V8H56V12H60V28H52V12H48V28H40V12H36V28H32ZM68 28V24H64V8H72V24H84V8H92V28H68ZM100 28V24H108V4H104V0H116V24H124V28H100ZM132 28V24H128V12H132V8H152V12H156V20H136V24H152V28H132ZM136 16H148V12H136V16ZM172 28V12H164V8H172V0H180V8H188V12H180V28H172Z",
            /* Crystal */
            "M8 28V24H4V20H0V8H4V4H8V0H24V4H28V8H20V4H12V8H8V20H12V24H20V20H28V24H24V28H8ZM44 12H48V16H44V28H36V8H44V12ZM60 8V12H48V8H60ZM68 32V28H84V24H68V20H64V8H72V20H84V8H92V28H88V32H68ZM96 28V24H116V20H100V16H96V12H100V8H120V12H104V16H120V20H124V24H120V28H96ZM140 28V12H132V8H140V0H148V8H156V12H148V28H140ZM164 28V24H160V20H164V16H180V12H164V8H184V12H188V28H164ZM168 24H180V20H168V24ZM196 28V24H204V4H200V0H212V24H220V28H196Z",
            /* Gem */
            "M8 28V24H4V20H0V8H4V4H8V0H28V4H12V8H8V20H12V24H20V16H16V12H28V28H8ZM36 28V24H32V12H36V8H56V12H60V20H40V24H56V28H36ZM40 16H52V12H40V16ZM64 28V8H88V12H92V28H84V12H80V28H72V12H68V28H64Z",
            /* Helm */
            "M0 28V0H8V12H20V0H28V28H20V16H8V28H0ZM36 28V24H32V12H36V8H56V12H60V20H40V24H56V28H36ZM40 16H52V12H40V16ZM68 28V24H76V4H72V0H84V24H92V28H68ZM96 28V8H120V12H124V28H116V12H112V28H104V12H100V28H96Z",
            /* Plate */
            "M0 28V0H24V4H28V16H24V20H8V28H0ZM8 16H20V4H8V16ZM36 28V24H44V4H40V0H52V24H60V28H36ZM68 28V24H64V20H68V16H84V12H68V8H88V12H92V28H68ZM72 24H84V20H72V24ZM108 28V12H100V8H108V0H116V8H124V12H116V28H108ZM132 28V24H128V12H132V8H152V12H156V20H136V24H152V28H132ZM136 16H148V12H136V16Z",
            /* Seed */
            "M4 28V24H0V20H8V24H20V16H4V12H0V4H4V0H24V4H28V8H20V4H8V12H24V16H28V24H24V28H4ZM36 28V24H32V12H36V8H56V12H60V20H40V24H56V28H36ZM40 16H52V12H40V16ZM68 28V24H64V12H68V8H88V12H92V20H72V24H88V28H68ZM72 16H84V12H72V16ZM100 28V24H96V12H100V8H116V0H124V28H100ZM104 24H116V12H104V24Z",
            /* Shard */
            "M4 28V24H0V20H8V24H20V16H4V12H0V4H4V0H24V4H28V8H20V4H8V12H24V16H28V24H24V28H4ZM32 28V0H40V8H56V12H60V28H52V12H40V28H32ZM68 28V24H64V20H68V16H84V12H68V8H88V12H92V28H68ZM72 24H84V20H72V24ZM108 12H112V16H108V28H100V8H108V12ZM124 8V12H112V8H124ZM132 28V24H128V12H132V8H148V0H156V28H132ZM136 24H148V12H136V24Z",
            /* Sword */
            "M4 28V24H0V20H8V24H20V16H4V12H0V4H4V0H24V4H28V8H20V4H8V12H24V16H28V24H24V28H4ZM40 24H44V28H36V24H32V8H40V24ZM48 8V24H44V8H48ZM60 8V24H56V28H48V24H52V8H60ZM68 28V24H64V12H68V8H88V12H92V24H88V28H68ZM72 24H84V12H72V24ZM108 12H112V16H108V28H100V8H108V12ZM124 8V12H112V8H124ZM132 28V24H128V12H132V8H148V0H156V28H132ZM136 24H148V12H136V24Z"
        ];
    }
}
