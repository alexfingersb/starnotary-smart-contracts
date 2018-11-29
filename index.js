
const contractAddress = '0x58c6bd886d111f1329ebe89de561516a128adcc4'

const url = 'https://rinkeby.infura.io/v3/83496c4b5216481f978925aa153c4360'

if (typeof web3 != 'undefined') {
	web3 = new Web3(web3.currentProvider) // what Metamask injected
} else {
	web3 = new Web3(new Web3.providers.HttpProvider(url))
}

web3.eth.defaultAccount = web3.eth.accounts[0];
const contract = web3.eth.contract(starNotaryABI).at(contractAddress);

function claimButtonClicked() {
	let account = web3.eth.defaultAccount;
	let starName = document.getElementById("star-name-input").value;
	let starDec = document.getElementById("star-dec-input").value;
	let starMag = document.getElementById("star-mag-input").value;
	let starCent = document.getElementById("star-cent-input").value;
	let starStory = document.getElementById("star-story-input").value;

	contract.createStar(starName, starCent, starDec, starMag, starStory,
		{ gas: 4950000, gasPrice: '10000000000'},
		function (error, result) {
			if (!error) {
				document.getElementById('output').innerText = result;
			} else {
				console.error(error);
				return;
			}
		});


	contract.createTokenId(starCent, starDec, starMag,
		function(error, result) {
			if (!error) {
				document.getElementById('star-id').innerText = result;
			} else {
				console.log(error);
				return;
			}
		});
}

function starButtonClicked(option) {

	let account = web3.eth.defaultAccount;
	let starId;

	if (option === 0) {
		let token = document.getElementById('star-token-input').value
		if (token) {
			contract.tokenIdToStarInfo(token,
				function (error, result) {
					if (!error) {
						document.getElementById('retrieve-output').innerHTML = result;
					} else {
						console.error(error);
						return;
					}
				});

		} else {
			alert('Please, input the the coordinates!')
		}

	} else {
		starId = document.getElementById('star-index-input').value
		contract.getStarByIndex(starId, { from: account, gas: 4000000 },
			function (error, result) {
				if (!error) {
					document.getElementById('retrieve-output').innerHTML = result;
				} else {
					console.error(error);
					return;
				}
			});
	}


}
