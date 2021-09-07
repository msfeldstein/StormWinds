import { expect } from "chai";
import { ethers } from "hardhat";
// @ts-ignore
import { expectRevert } from "@openzeppelin/test-helpers";

describe("Storms", function () {
  it("Should have no active storms on initial deploy", async function () {
    const Storms = await ethers.getContractFactory("Storms");
    const storms = await Storms.deploy();
    await storms.deployed();
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });

  it("Should have active fire storm once activated", async function () {
    const Storms = await ethers.getContractFactory("Storms");
    const storms = await Storms.deploy();
    await storms.deployed();
    await storms.activate(0, Math.floor(Date.now() / 1000) + 1000);
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.true;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });

  it("Should have active wind storm once activated", async function () {
    const Storms = await ethers.getContractFactory("Storms");
    const storms = await Storms.deploy();
    await storms.deployed();
    await storms.activate(3, Math.floor(Date.now() / 1000) + 1000);
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.true;
    expect(lightning).to.be.false;
  });

  it("Activating should fail to activate in the past", async function () {
    const Storms = await ethers.getContractFactory("Storms");
    const storms = await Storms.deploy();
    await storms.deployed();
    await expectRevert.unspecified(
      storms.activate(0, Math.floor(Date.now() / 1000) - 1000)
    );
    const [fire, sand, ice, wind, lightning] = await storms.activeStorms();
    expect(fire).to.be.false;
    expect(sand).to.be.false;
    expect(ice).to.be.false;
    expect(wind).to.be.false;
    expect(lightning).to.be.false;
  });
});
