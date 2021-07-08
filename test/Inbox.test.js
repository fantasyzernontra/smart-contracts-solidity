const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

// Data properties of the contract
// Interface is an ABI of the contract
// Bytecode is raw data of the contract
const { interface, bytecode } = require('../compile')

// Instance of Web3
const provider = ganache.provider()
const web3 = new Web3(provider)

// Testing Assertion
let accounts
let inbox
const INITIAL_MESSAGE = 'Hi There!'
const NEW_MESSAGE = 'Non Nontra'

beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts()

	// ABI or Interface of the contract
	const parsedInterface = JSON.parse(interface)
	// Deploying the contract
	inbox = await new web3.eth.Contract(parsedInterface)
		.deploy({
			data: bytecode,
			arguments: [INITIAL_MESSAGE],
		})
		.send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
	it('Deploys a contract', () => {
		assert.ok(inbox.options.address)
	})

	it('Default message verification', async () => {
		const message = await inbox.methods.message().call()
		assert.strictEqual(message, INITIAL_MESSAGE)
	})

	it('Setting message verification', async () => {
		await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] })
		const message = await inbox.methods.message().call()
		assert.strictEqual(message, NEW_MESSAGE)
	})
})
