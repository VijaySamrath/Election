const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ElectionContract",async  function(){
  let election;

  async function deploy() {
      const Election = await ethers.getContractFactory("Election");
      election = await Election.deploy();
      await election.deployed();
      console.log("election ==>", election.address)
  }

  before("Before", async () => {
    accounts = await ethers.getSigners();

    await deploy();

})

it("candidatesCount", async () => {
  try {
    CandidatesCount = await election.candidatesCount();
  } catch (error) {
      console.log(error)
  }

  console.log("candidatesCount: ", CandidatesCount);

  expect(CandidatesCount).to.equal("2");

})

it("shouldAddCandidate", async () => {
  BeforeCandidatesCount = await election.candidatesCount();

  try {
   await election.addCandidate("vijay");
  } catch (error) {
      console.log(error)
  }
  AfterCandidatesCount = await election.candidatesCount();

  // console.log("addCandidate: ", AddCandidate);

  expect(AfterCandidatesCount).to.equal("3");
  expect(AfterCandidatesCount).to.above(BeforeCandidatesCount);

})


it("shouldVote", async () => {

  await election.connect(accounts[1]).vote(3)
  await expect(election.connect(accounts[1]).vote(3)).to.be.revertedWith("not the voter")

  await expect(election.connect(accounts[2]).vote(0)).to.be.revertedWith("not equal to candidate count")
  await expect(election.connect(accounts[2]).vote(4)).to.be.revertedWith("not equal to candidate count")

})
})
