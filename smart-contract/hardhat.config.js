/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/9618794613c247e88f19c54d67b6ae5b",
      accounts: [
        "dcd57db7e814921192e340e1d222605bc24d4ed1d168b6ed136fda454bcc3451",
      ],
    },
  },
};
