import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

window.addEventListener("load", () => {

  let coinPrice1;
  let coinPrice2;
  let button = document.getElementById("initializeGame");
  let timeCounter = 0;
  let minutes = document.getElementById("selectLengthBet");
  document.getElementById("coins1").setAttribute("disabled", "");
  document.getElementById("coins2").setAttribute("disabled", "");
  let startBetCounter = 0;



  button.onclick = function () {
    document.getElementById("selectLengthBet").setAttribute("disabled", "");
    let setBetTime = parseInt(minutes[minutes.selectedIndex].value);
    coinPrice1 = parseFloat(document.getElementById("toFill1").innerText)
    coinPrice2 = parseFloat(document.getElementById("toFill2").innerText)
    button.setAttribute("class", "hidden");
    let minuteCounter = setBetTime;
    let secondsCounter = 0;
    let timerMinute = document.getElementById("timerMinute");
    let timerSecond = document.getElementById("timerSecond");

    let betInterval = setInterval(() => {
      let counter = 0;
      if (secondsCounter === 0 && minuteCounter === 0) {
        timerMinute.innerText = "0";
        timerSecond.innerText = "00";
        counter = 1;
        let winner = document.getElementById("winner");
        console.log(winner + "WINNER");
        //coin price, coin name, player
        let coinPricePercent1 = parseFloat(document.getElementById("toFill1").innerText) / coinPrice1 - 1;
        let coinPricePercent2 = parseFloat(document.getElementById("toFill2").innerText) / coinPrice2 - 1;
        console.log(coinPricePercent1 + "COINPR1");
        console.log(coinPricePercent2 + "COINPR2");
        if (coinPricePercent1 > coinPricePercent2) {
          winner.innerText = "Player 1 Wins!!";
        } else if (coinPricePercent1 < coinPricePercent2) {
          winner.innerText = "Player 2 Wins!!";
        } else {
          winner.innerText = "You both suck!!";
        }
        clearInterval(betInterval);
      }
      if (secondsCounter === 0 && counter === 0) {
        secondsCounter = 59;
        minuteCounter -= 1;
        console.log("hello");

      }
      if (counter === 0) {
        timerMinute.innerText = minuteCounter;
        timerSecond.innerText = secondsCounter;
        secondsCounter -= 1;
      }

    }, 1000)

  }
  // Business Logic

  // function getWeather(city) {
  //   let request = new XMLHttpRequest();
  //   const url = ``;

  //   request.addEventListener("loadend", function() {
  //     const response = JSON.parse(this.responseText);
  //     if (this.status === 200) {
  //       printElements(response, city);
  //     }
  //   });

  //   request.open("GET", url, true);
  //   request.send();
  // }

  function getCoin1(number) {
    let request = new XMLHttpRequest();
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5&CMC_PRO_API_KEY=${process.env.API_KEY}`;
    console.log("hello2");
    request.addEventListener("loadend", function () {
      const receivedCoinArray = JSON.parse(this.responseText);
      let name = receivedCoinArray.data;
      let i = number;
      console.log(name);
      if (this.status === 200) {
        name.forEach(element => {
          console.log("spin");
          i++;
          let x = document.getElementById(`${i}`);
          x.setAttribute("value", `${element.id}`);
          x.innerText = `${element.name}`;
        });
      }
    });
    request.open("GET", url, true);
    request.send();
  }

  getCoin1(0);
  getCoin1(5);

  document.getElementById("coins1").addEventListener("change", function () {
    startBetCounter++;
    if (startBetCounter === 2) {
      document.getElementById("initializeGame").removeAttribute("disabled");
    }
    afterChangePrice("coins1", "toFill1");
    let priceUpdateInterval1 = setInterval(() => {
      afterChangePrice("coins1", "toFill1");
      let minutesTime = parseInt(minutes[minutes.selectedIndex].value);
      timeCounter += 1;
      if (timeCounter === minutesTime) {
        clearInterval(priceUpdateInterval1);
      }
    }, 60000);

  });

  document.getElementById("coins2").addEventListener("change", function () {
    startBetCounter++;
    if (startBetCounter === 2) {
      document.getElementById("initializeGame").removeAttribute("disabled");
    }
    afterChangePrice("coins2", "toFill2");
    let priceUpdateInterval2 = setInterval(() => {
      afterChangePrice("coins2", "toFill2");
      let minutesTime = parseInt(minutes[minutes.selectedIndex].value);
      if (timeCounter === minutesTime) {
        clearInterval(priceUpdateInterval2);
      }
      timeCounter += 1;
    }, 60000);

  });

  function afterChangePrice(coins, text) {
    let coinValue = document.getElementById(coins);
    let coinID = (coinValue[coinValue.selectedIndex].value);
    let request = new XMLHttpRequest();
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${coinID}&CMC_PRO_API_KEY=${process.env.API_KEY}`;
    request.addEventListener("loadend", function () {
      const selectedCoin = JSON.parse(this.responseText);
      let coinPrice = selectedCoin.data[coinID].quote.USD.price;
      if (this.status === 200) {
        document.getElementById(text).innerText = coinPrice;
        let x = document.getElementById(coins);
        x.setAttribute("disabled", "");
      }
    });

    request.open("GET", url, true);
    request.send();
  }

  document.getElementById("selectLengthBet").addEventListener("change", () => {
    document.getElementById("coins1").removeAttribute("disabled", "");
    document.getElementById("coins2").removeAttribute("disabled", "");
    document.getElementById("selectLengthBet").setAttribute("disabled", "");
  });


  /////PLAYER TWO


});






////////////////
// // UI Logic

// function printElements(apiResponse, city) {
//   document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
//   The temperature in Kelvins is ${apiResponse.main.temp} degrees.`;
// }

// function handleFormSubmission(event) {
//   event.preventDefault();
//   const city = document.querySelector('#location').value;
//   document.querySelector('#location').value = null;
//   getWeather(city);
// }

// window.addEventListener("load", function() {
//   document.querySelector('form').addEventListener("submit", handleFormSubmission);
// });