import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers.js"
import chai from "chai";

const { expect } = chai;

describe("HToken", function () {

  async function deployHTokenFixture() {
    const MAX_SUPPLY = 1_000_000n;
    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("HToken");
    const token = await Token.deploy(MAX_SUPPLY);
    return { token, owner, otherAccount, MAX_SUPPLY };
  }

  describe("Deployment", function () {
    it("Should set the right max supply", async function () {
      const { token, MAX_SUPPLY } = await loadFixture(deployHTokenFixture);
      expect(await token.MAX_SUPPLY()).to.equal(MAX_SUPPLY);
    });

    it("Should set the right owner", async function () {
      const { token, owner } = await loadFixture(deployHTokenFixture);
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {

    it("Should allow owner to mint tokens", async function () {
      const { token, owner } = await loadFixture(deployHTokenFixture);
      await token.mint(5000n);
      expect(await token.balanceOf(owner.address)).to.equal(5000n);
    });

    it("Should throw error when users mint", async function () {
      const { token, otherAccount } = await loadFixture(deployHTokenFixture);
      expect(token.connect(otherAccount).mint(100n))
        .to
        .revertedWithCustomError(token, "OwnableUnauthorizedAccount")
        .withArgs(otherAccount.address);
    });

    it("Should allow to mint tokens if currentSupply + amount ≤ maxSupply", async function () {
      const { token, owner } = await loadFixture(deployHTokenFixture);
      await token.mint(1_000_000n);
      expect(await token.balanceOf(owner.address)).to.equal(1_000_000n);
    });

    it("Should throw error if currentSupply + amount > maxSupply", async function () {
      const { token, owner } = await loadFixture(deployHTokenFixture);
      await token.mint(1_000_000n);
      await expect(token.mint(1n))
        .to
        .revertedWithCustomError(token, "ExceedsMintLimit");
    });
  });

  describe("Transfer", function () {

    it("Should transfer tokens if sender balance <= requested amount", async function () {
      const { token, otherAccount } = await loadFixture(deployHTokenFixture);
      await token.mint(1_000_000n);
      await token.transfer(otherAccount.address, 6000n)
      expect(await token.balanceOf(otherAccount.address)).to.equal(6000n);
    });

    it("Should throw error if insufficient balance", async function () {
      const { token, otherAccount } = await loadFixture(deployHTokenFixture);
      await token.mint(5000n);
      expect(token.transfer(otherAccount.address, 6000n))
        .to
        .revertedWithCustomError(token, "InsufficientBalance");
    });
  });
});
