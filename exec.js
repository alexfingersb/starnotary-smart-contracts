const HDWalletProvider = require('truffle-hdwallet-provider')
const starNotaryABI = require('starNotaryABI.js')
const Web3 = require('web3')
const mnemonic = 'around blame enrich very nuclear tuition dolphin fury wife suffer treat danger'
const host = 'https://rinkeby.infura.io/v3/83496c4b5216481f978925aa153c4360'
// const host = 'http://127.0.0.1:8545';
const provider = new HDWalletProvider(mnemonic, host)
const web3 = new Web3(provider)

const address = '0x41F565D0c30d061a74A06297A2Cf0C286B2c890A'
const contractAddress = '0x45e1a5b6c17e91059a472dab36915123a89b179b'

const starPrice = web3.utils.toWei('.01', 'ether')
const starName = "Star power 103!";
const starStory = "I love my wonderful star";
const starCent = "ra_032.151";
const starDec = "dec_121.871";
const starMag =  "mag_245.971";

const contractOptions = {
	address: contractAddress,
    jsonInterface: starNotaryABI,
    from: address,
	gasPrice: '10000000000',
	gas: 1000000
}

const transactionOptions = {
    from: address,
	gasPrice: '10000000000',
	gas: 1000000,
}

const contract = new web3.eth.Contract(starNotaryABI, contractAddress, contractOptions)

const createStar = async function() {
	console.log(`Calling create star method`);
	return await contract.methods.createStar(starName, starStory, starCent, starDec, starMag)
		.send(options)
		.on('transactionHash', (hash) => console.log("transactionHash", hash))
		.on('receipt', (hash) => console.log("receipt", hash))
		.on('error', console.error)
}
const createToken  = async function() {
	return await contract.methods.createTokenId(starCent, starDec, starMag).call();
};


const putStarForSale = async function(tokenId) {
	console.log(`Put star  with token ${tokenId} for sale`);
	return await contract.methods.putStarUpForSale(tokenId, starPrice)
		.send(transactionOptions)
		.on('transactionHash', (hash) => console.log('transactionHash', hash))
		.on('confirmation',(confirmationNumber) => console.log('confirmation', confirmationNumber))
		.on('receipt', (hash) => console.log('receipt', hash))
		.on('error', console.error)

};

function main() {
	var args = process.argv.slice(2);

	switch (args[0]) {
		case 'createStar': createStar(); break;
		case 'putForSale':
			createToken()
				.then(putStarForSale);
			break;
		case 'createToken': createToken().then(console.log); break;
		default:
		  console.log('Sorry, that is not something I know how to do.');
	  }
};

main()
