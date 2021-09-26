import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  const artifactsResult = await deploy("Artifacts", {
    from: deployer,
    args: [],
    log: true,
  });
  console.log(artifactsResult.address, "Address");

  const stormsResult = await deploy("Storms", {
    from: deployer,
    args: [artifactsResult.address],
    log: true,
  });

  if (hre.network.name === "ropsten" || hre.network.name === "rinkeby") {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    await hre.run("verify:verify", {
      address: stormsResult.address,
      constructorArguments: [artifactsResult.address],
    });

    await hre.run("verify:verify", {
      address: artifactsResult.address,
    });
  }
};
module.exports.tags = ["Storms", "Artifacts"];
