const web3 = new Web3(Web3.givenProvider);
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }


var url = new URL("https://api4.binance.com/api/v3/ticker/price");
const ethereumButton = document.getElementById("enableEthereumButton");
var eth_id = document.getElementById("eth");
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


setInterval(function() {
  let params = {symbol: "ETHUSDT"};
  url.search = new URLSearchParams(params).toString();
  fetch(url).then((response) => {
    response.json().then((myjson) => {
      eth_id.innerHTML = myjson["price"];
    });
  });
}, 1000);
