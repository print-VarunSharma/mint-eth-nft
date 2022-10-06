const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ApolloNFT = await ethers.getContractFactory("ApolloNFT");

  // Start Deployment, returning a promise that resolves to a contract object
  const apollonft = await ApolloNFT.deploy();

  console.log("Contract deployed to address:", apollonft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
