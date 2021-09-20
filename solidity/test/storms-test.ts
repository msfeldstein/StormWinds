import { expect } from "chai";
import { ethers } from "hardhat";
// @ts-ignore
import { expectRevert } from "@openzeppelin/test-helpers";
import { Contract } from "@ethersproject/contracts";

describe("Storms", function () {
  let storms: Contract;
  let artifacts: Contract;

  beforeEach(async function () {
    const Artifacts = await ethers.getContractFactory("TestArtifacts");
    artifacts = await Artifacts.deploy();
    await artifacts.deployed();
    const Storms = await ethers.getContractFactory("Storms");
    storms = await Storms.deploy(artifacts.address);
    await storms.deployed();
  });

  it("Should have no active storms on initial deploy", async function () {
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });

  it("Should not be able to summon a storm without a helm", async function () {
    await expectRevert(
      storms.summon("fire", Math.floor(Date.now() / 1000) + 1000),
      "powerless"
    );
  });

  it("Should have active fire storm once activated", async function () {
    await artifacts.mintToken(1);
    await storms.summon("fire", Math.floor(Date.now() / 1000) + 1000);
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.true;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
    const fireActive = await storms.stormIsActive("fire");
    expect(fireActive).to.be.true;
    const windActive = await storms.stormIsActive("wind");
    expect(windActive).to.be.false;
  });

  it("Should have active wind storm once activated", async function () {
    await artifacts.mintToken(10);
    await storms.summon("wind", Math.floor(Date.now() / 1000) + 1000);
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.true;
    expect(lightning).to.be.false;
    const fireActive = await storms.stormIsActive("fire");
    expect(fireActive).to.be.false;
    const windActive = await storms.stormIsActive("wind");
    expect(windActive).to.be.true;
  });

  it("Should be unable to activate without the correct helm type", async function () {
    // Mint a wind helm
    await artifacts.mintToken(10);
    // Try to activate fire
    await expectRevert(
      storms.summon("fire", Math.floor(Date.now() / 1000) + 1000),
      "powerless"
    );
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
    const fireActive = await storms.stormIsActive("fire");
    expect(fireActive).to.be.false;
    const windActive = await storms.stormIsActive("wind");
    expect(windActive).to.be.false;
  });

  it("Activating should fail to activate in the past", async function () {
    await expectRevert.unspecified(
      storms.summon("fire", Math.floor(Date.now() / 1000) - 1000)
    );
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });

  it("Activating should fail with an unknown storm type", async function () {
    await expectRevert.unspecified(
      storms.summon("friendship", Math.floor(Date.now() / 1000) + 1000)
    );
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });
});
