// Reading File Library
const path = require('path')
const fs = require('fs')

// Solidity Compiler Libray
const solc = require('solc')

// Solidity Importing
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
// Content of the file
const source = fs.readFileSync(inboxPath, 'utf8')

// Compiling the contract into Bytecode inorder to let the contract is executeable.
module.exports = solc.compile(source, 1).contracts[':Inbox']
