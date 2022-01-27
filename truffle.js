require('dotenv').config()

const path = require('path');
const mnemonic = process.env.MNEMONIC_PASSWORD;
const RinkebyWSEndPoint = process.env.RINKEBY_WS_END_POINT;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gasPrice: 10000000000,
      gas: 6721975
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic, RinkebyWSEndPoint)
      },
      network_id: 4,
      gasPrice: 10000000000,
      gas: 4500000
    }
  },
  compilers: {
    solc: {
      version: '0.8.0',
      parser: 'solcjs'
    }
  }
};
