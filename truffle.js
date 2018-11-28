var HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = 'around blame enrich very nuclear tuition dolphin fury wife suffer treat danger';

module.exports = {
  networks: { 
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*"
    }, 
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/83496c4b5216481f978925aa153c4360') 
        
      },
      network_id: 4,
      gas: 4950000,
      gasPrice: 10000000000,
    }
  }
};