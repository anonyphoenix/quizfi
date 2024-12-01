import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env.local" });
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  paths: {
    // artifacts: "./src",
  },
  networks: {
    "edu-chain-testnet": {
      // Testnet configuration
      url: `https://rpc.open-campus-codex.gelato.digital`,
      accounts: [ACCOUNT_PRIVATE_KEY],
      chainId: 656476,
    },
    "edu-chain": {
      // Mainnet configuration
      url: `https://rpc.edu-chain.raas.gelato.cloud`,
      accounts: [ACCOUNT_PRIVATE_KEY],
      chainId: 41923,
    },
  },
  etherscan: {
    apiKey: {
      'edu-chain-testnet': 'empty'
    },
    customChains: [
      {
        network: "edu-chain-testnet",
        chainId: 656476,
        urls: {
          apiURL: "https://edu-chain-testnet.blockscout.com/api",
          browserURL: "https://edu-chain-testnet.blockscout.com"
        }
      }
    ]
  }
};

export default config;