const connectSuccess = document.getElementById('connectButton');
const tagLine = document.querySelector('.tagline');

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
