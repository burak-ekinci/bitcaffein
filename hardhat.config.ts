import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: { chainId: 1337 },
    localhost: {},
    ganache: { url: "http://127.0.0.1:7545" },
  },
};

export default config;
