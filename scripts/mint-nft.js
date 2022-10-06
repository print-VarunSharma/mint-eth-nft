require("dotenv").config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/ApolloNFT.sol/ApolloNFT.json");

// prod mainnet" 0x0122b7BbfAe716854AA1Fadc084c623bc453F62d

// goerli 0xe125415007FF278C64C5756d536d25739a05631c

// prod main net 2: 0xcFF1D1Fa6357AE60E64aB43C1C9a6B75020D8283
const contractAddress = "0xcFF1D1Fa6357AE60E64aB43C1C9a6B75020D8283";
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);

const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;

async function mintNFT(tokenURI) {
  // get the nonce - nonce is needed for security reasons. It keeps track of the number of
  // transactions sent from our address and prevents replay attacks.
  const nonce = await alchemyWeb3.eth.getTransactionCount(
    METAMASK_PUBLIC_KEY,
    "latest"
  );
  const tx = {
    from: METAMASK_PUBLIC_KEY, // our MetaMask public key
    to: contractAddress, // the smart contract address we want to interact with
    nonce: nonce, // nonce with the no of transactions from our account
    gas: 1000000, // fee estimate to complete the transaction
    data: nftContract.methods
      .createNFT("0x751a9269834F14E052E78600a448F42bad24d9f8", tokenURI)
      .encodeABI(), // call the createNFT function from our OsunRiverNFT.sol file and pass the account that should receive the minted NFT.
  };

  const signPromise = alchemyWeb3.eth.accounts.signTransaction(
    tx,
    METAMASK_PRIVATE_KEY
  );
  signPromise
    .then((signedTx) => {
      alchemyWeb3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of our transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of our transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting our transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });
}

const babyNftMetaDataJsonIpvfs =
  "https://ipfs.io/ipfs/bafkreic22bwziqjpwvx6kgp7o4i7y7a6eo6aqjmliozkaq65txrsewwuyi";

const apolloMetaData =
  "https://ipfs.io/ipfs/bafkreigk6jvk22abj5nzseyjdkmpphzok4qkaa56irrqtqci3mnlgeus7m";
mintNFT(apolloMetaData);
// output: trans hash: 0x313a3e6c7d4ec15319822555a45ea230388e39a55245d9066c1fb043943cb0d3

// prod output: 0x28ef1335d89da1aae2342a14f146a6c0704489a0e0ed4e1e4e1b80b22896adb4
