
if(typeof web3 != 'undefined') {
		web3 = new Web3(web3.currentProvider) // what Metamask injected
} else {
		web3 = new Web3(new Web3.providers.HttpProvider(url))
}

const contractAddress = '0x41f565d0c30d061a74a06297a2cf0c286b2c890a'
const url = 'https://rinkeby.infura.io/v3/83496c4b5216481f978925aa153c4360'

const contractOptions = {
	address: contractAddress,
    jsonInterface: starNotaryABI,
    from: address,
	gasPrice: '10000000000',
	gas: 1000000
}


const contract = new web3.eth.Contract(starNotaryABI, contractAddress, contractOptions)
web3.eth.defaultAccount = web3.eth.accounts[0];

function claimButtonClicked() {
		let account = web3.eth.defaultAccount;
		let starName = document.getElementById("star-name-input").value;
		let starDec = document.getElementById("star-dec-input").value;
		let starMag = document.getElementById("star-mag-input").value;
		let starCent = document.getElementById("star-cent-input").value;
		let starStory = document.getElementById("star-story-input").value;

		starNotary.createStar(starName, starDec, starMag, starCent, starStory,
			{ from: account, gas: 4000000 },
			function(error, result) {
				if (!error) {
						document.getElementById('output').innerText = result;
				} else {
						console.error(error);
						return;
				}
		});
}

function starButtonClicked() {
	const starIndex = document.getElementById('star-tokenid-input').value
	let account = web3.eth.defaultAccount;
	contract.tokenIdToStarInfo(starIndex, {from: account, gas: 4000000},
		function(error, result) {
				if (!error) {
						document.getElementById('retrive-output').innerText = result;
				} else {
						console.error(error);
						return;
				}
		});
}
