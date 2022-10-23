const connectSuccess = document.getElementById('connectButton');
const tagLine = document.querySelector('.tagline');

async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    connectSuccess.innerHTML = 'Connected';
    tagLine.innerHTML = 'Shall we play a game?';
  } else {
    console.log('Metamask not present');
  }
}
