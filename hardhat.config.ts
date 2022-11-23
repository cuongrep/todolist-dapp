import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const { ALCHEMY_API_KEY, ACCOUNT_1, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      // to solve Error: cannot estimate gas; transaction may fail or may require manual gas limit
      // gas: 2100000,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ACCOUNT_1}`]
    }
  },
  paths: {
    artifacts: './src/artifacts'
  },
  etherscan: {
    apiKey: `${ETHERSCAN_API_KEY}`,
  }
};

export default config;
