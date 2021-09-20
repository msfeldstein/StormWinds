import { expect } from "chai";
import { ethers } from "hardhat";
// @ts-ignore
import { expectRevert } from "@openzeppelin/test-helpers";
import { Contract } from "@ethersproject/contracts";

describe("Storms", function () {
  let storms: Contract;
  let artifacts: Contract;

  beforeEach(async function () {
    const Artifacts = await ethers.getContractFactory("Artifacts");
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
    await expectRevert.unspecified(
      await storms.summon(0, Math.floor(Date.now() / 1000) + 1000)
    );
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.true;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });

  it("Should have active fire storm once activated", async function () {
    await artifacts.conjureHelm();
    await storms.summon(0, Math.floor(Date.now() / 1000) + 1000);
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.true;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });

  it("Should have active wind storm once activated", async function () {
    await storms.summon(3, Math.floor(Date.now() / 1000) + 1000);
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.true;
    expect(lightning).to.be.false;
  });

  it("Activating should fail to activate in the past", async function () {
    await expectRevert.unspecified(
      storms.summon(0, Math.floor(Date.now() / 1000) - 1000)
    );
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });
});
