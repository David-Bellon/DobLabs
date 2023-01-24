const web3 = new Web3(Web3.givenProvider);
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }

const ethereumButton = document.getElementById("enableEthereumButton");
var user_account;

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  getAccount();
});

async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    user_account = account;
    ethereumButton.innerHTML = account.substring(0, 20) + "...";
  }