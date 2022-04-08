# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

**Transaction Hash:** 0x9118f6fff1ae463773803061043a954256896c3c7ce475181b374fa90d13034e

**Contract Address:** 0x45e1a5b6c17e91059a472dab36915123a89b179b

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site) https://nodejs.org/en/.

### Tech
This project uses open source projects to work properly:

* [npm] - the package manager for JavaScript
* [ganache] - A personal blockchain for Ethereum development you can use to deploy contracts, develop your applications, and run tests
* [truffle] - Development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM)
* [truffle-hdwallet-provider] - HD Wallet-enabled Web3 provider
* [web3.js] - Ethereum JavaScript API
* [connect] - Connect is an extensible HTTP server framework for node using "plugins" known as middleware.

### Rinkeby

**Rinkeby URL:** https://rinkeby.infura.io/v3/83496c4b5216481f978925aa153c4360

### Configuring your project

- Install Truffle
```
npm install -g truffle
```

- Use Truffle to initialize your project.
```
mkdir myProject
cd myProject
truffle init
```

- Install Truffle provider
```
npm install truffle-hdwallet-provider
```

- Install Web3 JS
```
npm install web3
```

- Install Connect
```
npm install connect
npm install serve-static
```

## Testing with truffle on local network

To test code:
1: Open a command prompt or shell terminal after install truffle.
2: Execute ganache cli with mnemonic
```
ganache-cli --mnemonic 'put you mnemonic here'
```
2: Execute test with truffle on local machine
```
truffle console
compile
test
```

## Testing with truffle on rinkeby network

To test code:
1: Open a command prompt or shell terminal after install truffle.
2: Execute test with truffle on local rinkeby network
```
truffle console
compile
test --network rinkeby
```

## Testing with web3.js on rinkeby network
1: Open a new command prompt or shell terminal
2: Enter the command below to create a new star
```
node exec.js createStar
```
3: Enter the command below to put up the star for sale
```
node exec.js putForSale
```

## Testing on browser

1: Run the server on port 3000
```
node server.js
```
2: Open the browser and navigate to  http://localhost:3000


[node.js]: http://nodejs.org
[ganache]: https://truffleframework.com/ganache
[truffle]: https://github.com/trufflesuite/truffle
[npm]: https://www.npmjs.com
[truffle-hdwallet-provider]: https://github.com/trufflesuite/truffle-hdwallet-provider
[web3.js]: https://github.com/ethereum/web3.js/
[connect]: https://www.npmjs.com/package/connect
