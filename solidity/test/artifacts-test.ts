import { expect } from "chai";
import { ethers } from "hardhat";
// @ts-ignore
import { expectRevert } from "@openzeppelin/test-helpers";
import { Contract } from "@ethersproject/contracts";

describe("Artifacts", function () {
  let artifacts: Contract;
  let loot: Contract;
  beforeEach(async function () {
    const Artifacts = await ethers.getContractFactory("TestArtifacts");
    artifacts = await Artifacts.deploy();
    await artifacts.deployed();
    const Loot = await ethers.getContractFactory("Loot");
    loot = await Loot.deploy();
    await loot.deployed();

    await artifacts.setLootAddress(loot.address);
  });

  it("Supports royalties", async function () {
    const supports = await artifacts.supportsInterface(0x2a55205a);
    expect(supports).to.be.true;
    const [receiver, amount] = await artifacts.royaltyInfo(0, 10000);
    expect(amount).to.eq(1000);
  });

  it("Fails conjuring with no loot or payment", async function () {
    await expectRevert(artifacts.conjureArtifact({ value: 0 }), "destitution");
  });

  it("Conjures with payment", async function () {
    await artifacts.conjureArtifact({ value: ethers.utils.parseEther("0.12") });
  });
});
