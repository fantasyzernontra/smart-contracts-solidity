const HDWalletProvier = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

// Setting up HD Wallet Provider
const provider = new HDWalletProvier(
	'gossip leader close name soft rent chase crumble open bracket rare birth',
	'https://rinkeby.infura.io/v3/a67684f670804a78b150e5fa5bfd02ef'
)
const web3 = new Web3(provider)

// Deploying
const deploy = async () => {
	const accounts = await web3.eth.getAccounts()

	console.log('Attemping to deploy from account ', accounts[0])
	const parsedInterface = JSON.parse(interface)

	const result = await new web3.eth.Contract(parsedInterface)
		.deploy({
			data: bytecode,
			arguments: ['Non Nontra'],
		})
		.send({ gas: '1000000', from: accounts[0] })

	console.log('Contract deployed to ', result.options.address)
}
deploy()
