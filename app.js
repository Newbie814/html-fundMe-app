import { ethers } from './ethers-5.6.esm.min.js';
import { abi, contractAddress } from './constants.js';

const connectButton = document.getElementById('connect-button');
const fundButton = document.getElementById('fund-button');
const balanceButton = document.getElementById('balance-button');
const withdrawButton = document.getElementById('withdraw-button');
const tagLine = document.querySelector('.tagline');

connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

// async function connect() {
//   if (typeof window.ethereum !== 'undefined') {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     connectSuccess.innerHTML = 'Connected';
//     tagLine.innerHTML = 'Shall we play a game?';
//   } else {
//     connectSuccess.innerHTML = 'Not Found!!';
//     tagLine.innerHTML = 'Please install MetaMask';
//   }
// }

async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = 'Connected';
    tagLine.innerHTML = 'Shall we play a game?';
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts);
  } else {
    connectButton.innerHTML = 'Please install MetaMask';
  }
}

async function withdraw() {
  if (typeof window.ethereum !== 'undefined') {
    console.log('Withdrawing...');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const txResponse = await contract.withdraw();
      await listenForTransactionMine(txResponse, provider);
      console.log('Withdraw complete');
    } catch (error) {
      console.log(error);
    }
  }
}

async function getBalance() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(`Balance: ${ethers.utils.formatEther(balance)}`);
  }
}

async function fund() {
  const ethAmount = document.getElementById('ethAmount').value;
  console.log(`Funding with ${ethAmount} ETH`);
  if (typeof window.ethereum !== 'undefined') {
    // provider
    // signer
    // contract interacting with
    // ABI and address
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const txResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(txResponse, provider);
      console.log('Funding complete');
    } catch (error) {
      console.log(error);
    }
  } else {
    fundButton.innerHTML = 'Please install MetaMask';
  }
}

function listenForTransactionMine(txResponse, provider) {
  console.log(`Transaction hash: ${txResponse.hash}..`);
  return new Promise((resolve, reject) => {
    provider.once(txResponse.hash, (txReceipt) => {
      console.log(`Completed with ${txReceipt.confirmations} confirmations`);
      resolve();
    });
  });
}
