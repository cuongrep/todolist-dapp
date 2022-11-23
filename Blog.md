# Build a Decentralize App - Todo List
This blog will show you how to build your first dApp powered by hardhat, ethersjs, gatsby (a ReactJs framework).

---
## Introduction: Some concepts

### How does an dApp work?
Traditional App
FrontEnd - BackEnd - Database

Decentralize App
FrontEnd - SmartContract(BackEnd + Database) on a Blockchain network

### What is Blockchain?
- A blockchain is a public database that is updated and shared across many computers in a network
  - Block refers to data and state being stored in consecutive group know as "blocks"
  - Chain refers to the fact that each lock cryptographically references its parent.

### What is Ethereum?
- is a blockchain with a computer embedded in it.
- there is a single computer whose state everyone on the Ethereum network agrees on
  - everyone who participates in the Ethereum network keeps a copy of the state of this computer
  - any participant can broadcast a request for this computer to perform arbitrary computation
  - when a request is broadcast, other participants on the network verify, validate, and execute the computation.
  - the execution causes a state change in the EVM
- requests for computation are called transaction request(TX)
  - the record of all transactions and the EVM's present state gets stored on the blockchain
  - cryptographic mechanisms ensure that once transactions are verified as valid and added to the blockchain, they can't be tampered with later.

### What are smart contracts?
- It is the programs uploaded to and executed by the network.
- In other work, it is a reusable program which a developer publishes into EVM state.
- smart contract don't run on your computer or any server, they live on the Ethereum network.

### Hardhat Framework
Hardhat is a development environment for Ethereum software. It consists of different components for editing, compiling, debugging and deploying your smart contracts and dApps, all of which work together to create a complete development environment.
https://hardhat.org/

### Ethers.js
The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem. It was originally designed for use with ethers.io and has since expanded into a more general-purpose library.
https://docs.ethers.io/v5/

### Openzeppelin
OpenZeppelin provides security products to build, automate, and operate decentralized applications. We also protect leading organizations by performing security audits on their systems and products.
https://www.openzeppelin.com/

### Gatsby
Gatsby enables developers to build fast, secure, and powerful websites using a React-based framework and innovative data layer that makes integrating different content, APIs, and services into one web experience incredibly simple.

https://www.gatsbyjs.com
---
## Project Setup
### You can download the final source code of the project at the Github link below:

## Step by Step to build your first dApp - Todo List
### Prerequisite:
- Node v16.x.x
- Hardhat supported a built-in local blockchain that is enough for running unit test and for debugging:
```
npx hardhat node
```

### Agenda:
- configure project
- create a smart contract with the Solidity programming language
- write tests against the smart contract, and deploy it to a blockchain.
- create a client side application to for the todo list.
- deploy smart contract on Goerli testnet
- deploy the client side application on nestify

#### configure project for develop on your local
- You can follow the link below to create a new project using TypeScript
https://www.gatsbyjs.com/docs/tutorial/part-1/
- In the new project created above, please run these commands below:
```bash
npm install --save-dev hardhat
npx hardhat
```
- Please install the dependencies below providing almost features you need to build the ToDo list dApp
```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-chai-matchers chai @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan @nomicfoundation/hardhat-network-helpers @typechain/ethers-v5 @typechain/hardhat hardhat-gas-reporter solidity-coverage ethers typechain @types/mocha
```
- After configuring the project, what you've done
  - contracts directory: this is where all smart contacts stored.
  - scripts directory: this is where you store all scripts including deployment, customized tasks
  - node_modules directory: this is the home of all of our Node dependencies.
  - src directory: this is where we'll develop our client-side application.
  - test directory: this is where we'll write our tests for our smart contracts.
  - hardhat.config.ts file: this is the main configuration file for our Truffle project

#### Todo List smart contract
Some methods provided the smart contract
- create a new task
- get all task of an owner
- check task done or not
- The full smart contract goes as follows:
### Deploy on Goerli
- Get Alchemy key
- Deploy
- Configure contract address on project

### Deploy frontend on netify
- configure Github
- Deploy
- show link to connect