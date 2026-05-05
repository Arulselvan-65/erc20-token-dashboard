import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers.js"
import chai from "chai";

const { expect } = chai;

describe("HToken", function () {

  async function deployHTokenFixture() {
    const MAX_SUPPLY = ethers.parseEther("1000000");
    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("HToken");
    const token = await Token.deploy(MAX_SUPPLY);
    return { token, owner, otherAccount, MAX_SUPPLY };
  }

  describe("Deployment", function () {

    it("Should set the right token name", async function () {
      const { token } = await loadFixture(deployHTokenFixture);
      expect(await token.name()).to.equal("HToken");
    });

    it("Should set the right token symbol", async function () {
      const { token } = await loadFixture(deployHTokenFixture);
      expect(await token.symbol()).to.equal("HTK");
    });

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
      await token.mint(owner.address, ethers.parseEther("5000"));
      expect(await token.balanceOf(owner.address)).to.equal(ethers.parseEther("5000"));
    });

    it("Should throw error when users mint", async function () {
      const { token, otherAccount } = await loadFixture(deployHTokenFixture);
      await expect(token.connect(otherAccount).mint(otherAccount.address, 100n))
        .to
        .revertedWithCustomError(token, "OwnableUnauthorizedAccount")
        .withArgs(otherAccount.address);
    });

    it("Should allow to mint tokens if currentSupply + amount ≤ maxSupply", async function () {
      const { token, owner } = await loadFixture(deployHTokenFixture);
      await token.mint(owner.address, ethers.parseEther("1000000"));
      expect(await token.balanceOf(owner.address)).to.equal(ethers.parseEther("1000000"));
    });

    it("Should throw error if currentSupply + amount > maxSupply", async function () {
      const { token, owner } = await loadFixture(deployHTokenFixture);
      await token.mint(owner.address, ethers.parseEther("1000000"));
      await expect(token.mint(owner.address, 1n))
        .to
        .revertedWithCustomError(token, "ExceedsMintLimit");
    });
  });

  describe("Transfer", function () {

    it("Should transfer tokens if sender balance >= requested amount", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployHTokenFixture);
      await token.mint(owner.address, ethers.parseEther("1000000"));
      await token.transfer(otherAccount.address, ethers.parseEther("6000"))
      expect(await token.balanceOf(otherAccount.address)).to.equal(ethers.parseEther("6000"));
    });

    it("Should throw error if insufficient balance", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployHTokenFixture);
      await token.mint(owner.address, ethers.parseEther("5000"));
      await expect(token.transfer(otherAccount.address, ethers.parseEther("6000")))
        .to
        .revertedWithCustomError(token, "ERC20InsufficientBalance")
        .withArgs(owner.address, token.balanceOf(owner.address), ethers.parseEther("6000"));
    });
  });

  describe("Events", function () {

    it("Should emit TokenMinted on token mint", async function () {
      const { token, owner } = await loadFixture(deployHTokenFixture);
      expect(await token.mint(owner.address, ethers.parseEther("5000")))
        .to
        .emit(token, "TokenMinted")
        .withArgs(owner.address, ethers.parseEther("5000"));
    });

    it("Should emit Transfer on token transfer", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployHTokenFixture);
      await token.mint(owner.address, ethers.parseEther("7000"));
      await expect(token.transfer(otherAccount.address, ethers.parseEther("6000")))
        .to
        .emit(token, "Transfer")
        .withArgs(owner.address, otherAccount.address, ethers.parseEther("6000"));
    });
  });
});
