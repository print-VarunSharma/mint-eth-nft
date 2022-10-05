const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BBNFT = await ethers.getContractFactory("BabyNFT");

  // Start Deployment, returning a promise that resolves to a contract object
  const bbnft = await BBNFT.deploy();

  console.log("Contract deployed to address:", bbnft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
