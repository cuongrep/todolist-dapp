import React, { useState } from "react"
import { ethers } from 'ethers'
import type { HeadFC, PageProps } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TodoList from "./TodoList";

// function App() {
//   const [tokenData, setTokenData] = useState({});
//   const [amount, setAmount] = useState();
//   const [userAccountId, setUserAccountId] = useState();

//   // use to connect to the MetaMask wallet of the user
//   async function requestAccount() {
//     console.log("requestAccount is being invoked");
//     try {
//       if (!window.ethereum) return alert('Please install Metamask extention for your browser');
//       const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//       console.log("accounts", accounts);
//       const address = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       console.log(address);
//     } catch {
//       alert("Please connect to a wallet via metamask");
//     } 
//   }

//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();

//   async function _intializeContract(init) {
//     // We first initialize ethers by creating a provider using window.ethereum
//     // When, we initialize the contract using that provider and the token's
//     // artifact. You can do this same thing with your contracts.
//     const contract = new ethers.Contract(
//       tokenAddress,
//       TokenArtifact.abi,
//       init
//     );

//     return contract
//   }

//   async function _getTokenData() {
//     console.log("_getTokenData");
//     const contract = await _intializeContract(signer)
//     const name = await contract.name();
//     const symbol = await contract.symbol();
//     const tokenData = { name, symbol };
//     setTokenData(tokenData);
//   }

//   async function getBalance() {
//     if (typeof window.ethereum !== 'undefined') {
//       const contract = await _intializeContract(signer);
//       const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const balance = await contract.balanceOf(account);
//       console.log("Account: ", account);
//       console.log("Account Balance: ", balance.toString());
//     } else {
//       alert('Please install Metamask');
//     }
//   }

//   async function sendMDToken() {
//     if (typeof window.ethereum !== 'undefined') {
//       await requestAccount();
//       const contract = await _intializeContract(signer)
//       const transaction = await contract.transfer(userAccountId, amount);
//       await transaction.wait();
//       console.log(`${amount} MDToken has been sent to ${userAccountId}`);
//     }
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//       <button onClick={_getTokenData}>get token data</button>
//       <h1>{tokenData.name}</h1>
//       <h1>{tokenData.symbol}</h1>
//       <button onClick={requestAccount}>Request Account</button>
//       <button onClick={getBalance}>Get Balance</button>
//       <button onClick={sendMDToken}>Send MDToken</button>
//       <input onChange={e => setUserAccountId(e.target.value)} placeholder="Account ID" />
//         <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
//       </header>
//     </div>
//   );
// }

export default TodoList

export const Head: HeadFC = () => <title>To-Do List</title>
