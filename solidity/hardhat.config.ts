import { HardhatUserConfig } from "hardhat/types";
import { task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-deploy";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.8.4",
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
  typechain: {
    outDir: "../client/src/contracts",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/fPaqmXdqpVr6JQV4f0hdegj2Y8rwh6_d",
      accounts: [
        "0xf4947795e471b43fe86b0f8e1b86eadaab993a61d769b5ef808f87cac74f171b",
      ],
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/AA2aoABOa_0DfSIpiHlxeLKq7NL1czOv",
      accounts: [
        "0x552a4f25e41a0d722aa3d9c6ef69da6ee0ebdf28d9284d9714c0c7f32efb04b9",
      ],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      4: 0, // but for rinkeby it will be a specific address
    },
  },
  etherscan: {
    apiKey: "22FWIVWKUQ6WP4DV12TJUMFPCWEMUKXGYB",
  },
  paths: {
    deployments: "../client/src/deployments",
  },
};
export default config;
