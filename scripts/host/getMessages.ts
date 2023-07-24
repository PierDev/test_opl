import { ethers } from "hardhat";
const crypto = require("crypto");

const hostAdd = "0x17ecbd663adCac92746aF22b1dab24859aa7b1Aa"; // host on bsc

async function main() {
  
  const host = await ethers.getContractAt("HostV1", hostAdd);
  console.log("Messages: ", await host.getMessages());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
