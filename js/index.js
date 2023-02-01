const web3 = new Web3(Web3.givenProvider);
const tickets = ["btcusdt", "ethusdt"]
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    getAccount();
  }


var url = new URL("https://api4.binance.com/api/v3/ticker?");
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


setInterval(function() {
  let params = 'symbols=%5B"ETHUSDT","BTCUSDT"%5D';
  var search_url = url + params;
  fetch(search_url).then((response) => {
    response.json().then((myjson) => {
      for (var i=0; tickets.length; i++){
        var ticket_id = document.getElementById(tickets[i]);
        var price_class = ticket_id.getElementsByClassName("price-asset")[0];
        var change_per = ticket_id.getElementsByClassName("change-day")[0];
        price_class.innerHTML = String(tickets[i].toUpperCase() + ":  " + Number(myjson[i]["lastPrice"]).toFixed(3) + "$");
        if (parseFloat(myjson[i]["priceChangePercent"]) < 0){
          change_per.style.color = "red";
          change_per.innerHTML = String("24H % Change:  " + myjson[i]["priceChangePercent"]) + "%";
        }
        else{
          change_per.style.color = "green";
          change_per.innerHTML = String("24H % Change:  " + "+" + myjson[i]["priceChangePercent"]) + "%";
        }
      }
    });
  });
}, 1000);
