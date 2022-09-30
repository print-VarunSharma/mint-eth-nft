const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const APNFT = await ethers.getContractFactory("ApolloNFT");

  // Start Deployment, returning a promise that resolves to a contract object
  const apnft = await APNFT.deploy();

  console.log("Contract deployed to address:", apnft.address);
}

main(
  then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
