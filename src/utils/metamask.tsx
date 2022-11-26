import { ethers } from 'ethers';
import { getGlobalState, setGlobalState } from './store';

declare let window: any;
/**
 * @returns a provider that is a connection to the Ethereum network
 */
const getProvider = () => {
  if (!window.ethereum) return alert('Please install Metamask');
  return new ethers.providers.Web3Provider(window.ethereum);
}

export const getAccount = async () => {
  if (!window.ethereum) return alert('Please install Metamask');
  // provider === window.ethereum
  const provider = getProvider();
  // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  if (provider) {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  }
  return;
}

export const getEthereumContract = (contractAddress: any, contractAbi: any) => {
  try {
    console.log("contractAddress", contractAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
          window.location.reload();
      }
    });
    
    const signer = provider.getSigner();
    // const signerAddress = signer.getAddress();
    // console.log("balanceOf Signer:", provider.getBalance(signer.getAddress));
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    console.log('getEthereumContract, success');
    return contract;
  } catch (error) {
    console.log('getEthereumContract:error:', error);
    return null;
  }
}

export const isWalletConnected = async () => {
  try {
    if (!window.ethereum) {
      console.log('Please install Metamask');
      return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
          window.location.reload();
      }
    });

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    window.ethereum.on('chainChanged', (chainId: number) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async () => {
      console.log("connectedAccount", accounts[0]);
      setGlobalState('connectedAccount', accounts[0]);
      window.location.reload();
      // await isWalletConnected();
    })

    if (accounts !== undefined && accounts.length !== 0) {
      setGlobalState('connectedAccount', accounts[0]);
      console.log('Blockchain Loaded');
    } else {
      //alert('Please connect wallet.')
      console.log('No accounts found.');
    }
  } catch (error) {
    console.log('isWalletConnected error')
  }
}

export const connectWallet = async () => {
  try {
    console.log("connectWallet");
    if (!window.ethereum) return alert('Please install Metamask');

    // provider === window.ethereum
    // https://docs.ethers.io/v5/getting-started/#getting-started--connecting
    // MetaMask requires requesting permission to connect users accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setGlobalState('connectedAccount', accounts[0]);
  } catch (error) {
    console.log('connectWallet, error');
  }
}
