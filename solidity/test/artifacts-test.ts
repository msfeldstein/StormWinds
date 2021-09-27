import { expect } from "chai";
import { ethers } from "hardhat";
// @ts-ignore
import { expectRevert } from "@openzeppelin/test-helpers";
import { Contract } from "@ethersproject/contracts";

describe("Artifacts", function () {
  let artifacts: Contract;
  let loot: Contract;
  beforeEach(async function () {
    const SVGBuilder = await ethers.getContractFactory("ArtifactSVGBuilder");
    const svgBuilder = await SVGBuilder.deploy();
    const Artifacts = await ethers.getContractFactory("TestArtifacts");
    artifacts = await Artifacts.deploy(svgBuilder.address);
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

  it("Conjures with a divine hood", async function () {
    // Loot@3303 has a divind hood
    await loot.claim(3303);
    await artifacts.conjureWithLoot(3303);
  });

  it("can't conjure withsomeone elses loot", async function () {
    // Loot@3303 has a divind hood
    await loot.claim(1);
    await expectRevert(artifacts.conjureWithLoot(3303), "lies");
  });

  it("can't conjure twice with the same divine robe", async function () {});
});
