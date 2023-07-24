import { ethers } from "hardhat";
const crypto = require("crypto");

const enclaveAdd = "0x417E7A7562a940e464217d6a1328eE43FcFa6979";

async function main() {
  const enclave = await ethers.getContractAt("EnclaveV1", enclaveAdd);
  let message = "Hello World 2"
  const tx = await enclave.sendMessage(message);
  await tx.wait(2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
