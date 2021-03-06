import { expect } from "chai";
import { ethers, getUnnamedAccounts } from "hardhat";
// @ts-ignore
import { expectRevert } from "@openzeppelin/test-helpers";
import { Contract } from "@ethersproject/contracts";
import { DOMParser } from "xmldom";

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
    // Loot@3303 has a divine hood
    await loot.claim(3303);
    await artifacts.conjureWithLoot(3303);
  });

  it("can't conjure withsomeone elses loot", async function () {
    // Loot@3303 has a divine hood, but this account only has Loot@1
    await loot.claim(1);

    // Claim the token with a different account
    const accounts = await ethers.getSigners();
    const otherAccount = accounts[2];
    await loot.connect(otherAccount).claim(3303);

    await expectRevert(artifacts.conjureWithLoot(3303), "lies");
  });

  it("can't conjure twice with the same divine robe", async function () {
    // Loot@3303 has a divine hood
    await loot.claim(3303);
    await artifacts.conjureWithLoot(3303);
    await expectRevert(artifacts.conjureWithLoot(3303), "greed");
  });

  it("generates a valid tokenURI", async function () {
    const tokenURI = await artifacts.tokenURI(300);
    const base64 = tokenURI.split(",")[1];
    let buff = Buffer.from(base64, "base64");
    let jsonStr = buff.toString("utf-8");
    const json = JSON.parse(jsonStr);
    // Should have the token id in the name
    const imageDataUrl = json.image;
    const base64SVG = imageDataUrl.split(",")[1];
    const svgBuffer = Buffer.from(base64SVG, "base64");
    const svg = svgBuffer.toString("utf-8");
    let err = null;
    var parser = new DOMParser({
      errorHandler: function (e) {
        err = e;
      },
    });
    parser.parseFromString(svg, "text/xml");
    expect(err).to.be.null;
  });
});
