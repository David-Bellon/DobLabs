const web3 = new Web3(Web3.givenProvider);

var user_account;

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    getAccount();
  }
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    user_account = account;
    var text = document.getElementById("enableEthereumButton")
    text.innerHTML = account.substring(0, 20) + "...";
  }