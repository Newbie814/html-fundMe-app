import { ethers } from './ethers-5.6.esm.min.js';
import { abi, contractAddress } from './constants.js';

const connectButton = document.getElementById('connect-button');
const fundButton = document.getElementById('fund-button');
const tagLine = document.querySelector('.tagline');

connectButton.onclick = connect;
fundButton.onclick = fund;

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

async function fund() {
  const ethAmount = '77';
  console.log(`Funding with ${ethAmount} ETH`);
  if (typeof window.ethereum !== 'undefined') {
    // provider
    // signer
    // contract interacting with
    // ABI and address
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const txResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
  }
}
