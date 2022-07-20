// unit tests bas lal development chains
const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {
          let raffle, vrfCoordinatorV2Mock, raffleEntranceFee
          const chainId = network.config.chainId
          beforeEach(async function () {
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])
              raffle = await ethers.getContractAt("Raffle", deployer)
              vrfCoordinatorV2Mock = await ethers.getContractAt("VRFCoordinatorV2Mock", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
              // eza ma zabatet lgetcontract jarreb l getcontractat
          })
          describe("constructor", async function () {
              it("Initializes the raffle correctly", async function () {
                  //ideallly we make our tests have just 1 assert per "it"
                  const raffleState = await raffle.getRaffleState()
                  const interval = await raffle.getInterval()
                  assert.equal(raffleState.toString(), "0")
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"])
                  //bethot .to string eza its gna be a big number
              })
          })
          describe("enterRaffle", async function () {
              it("reverts when your don't pay enough", async function () {
                  await expect(raffle.enterRaffle()).to.be.revertedWith
              })
              it("records players when they enter", async function () {
                  await raffle.enterRaffle({ value: raffleEntranceFee })
                  const playerFromContract = await raffle.getPlayer[0]
                  assert.equal(playerFromContract, deployer)
                  //hay yaane l player should be deployer
              })
          })
      })
