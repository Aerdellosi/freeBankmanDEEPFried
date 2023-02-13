import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

window.addEventListener("load", () => {

  //initialize a whole bunch of variables
  //initialize the vars that will be filled when API is called
  //set timeCounter to 0, disable the drop down menus to select
  //the coins, they'll stay disabled until time is selected
  //minutes is the drop down where the user will input how long
  //their bet should go
  //be counter set to 0

  let coinPrice1;
  let coinPrice2;
  let button = document.getElementById("initializeGame");
  let timeCounter = 0;
  let minutes = document.getElementById("selectLengthBet");
  document.getElementById("coins1").setAttribute("disabled", "");
  document.getElementById("coins2").setAttribute("disabled", "");
  let startBetCounter = 0;



  button.onclick = function () {
    //disable the drop down to select for time since it's already
    //been inputted
    //the way drop downs work is that each element in the drop
    //down has an index associated with it. Each element also has
    //an optional value that can be assigned to it, in this case
    //we assigned values of ints equalling the minutes for each option
    //minutes --> selectedIndex --> value of selectedIndex
    //why can't i use dot notation here?
    //on click hide the button to start the bet
    //make a variable equal to set bet time
    //set seconds counter to 0
    //set variables to target the UI timer that will update every second


    document.getElementById("selectLengthBet").setAttribute("disabled", "");
    let setBetTime = parseInt(minutes[minutes.selectedIndex].value);
    console.log(setBetTime);
    console.log(minutes.selectedIndex.value);
    coinPrice1 = parseFloat(document.getElementById("toFill1").innerText)
    coinPrice2 = parseFloat(document.getElementById("toFill2").innerText)
    button.setAttribute("class", "hidden");
    let minuteCounter = setBetTime;
    let secondsCounter = 0;
    let timerMinute = document.getElementById("timerMinute");
    let timerSecond = document.getElementById("timerSecond");

    //every second counter will be reinitialized back to 0
    //if both the seconds counter and the minutes counter = 0,
    //manually set 0:00 for ui timer
    //set counter to 1
    //target the winner element
    //create a percent diff change between starting price and old price
    //for the chosen coins, do this by initial price/old price (to give
    //change of 0.8 or 1.2 etc.) and then subtract one to give us a
    //decimal change relative to 1, so .8 --> -0.2, 1.2 --> .2, and then
    //multiply by 100 and display to user in percent form
    //NOTE: after testing you don't need the weird syntax we have here
    //you only need to use the dot value, so:
    //myDropdown.selectedIndex will always retur nthe----
    //I'm trying to get the value of a key which is the selected index
        //so myDropdown --> 002: "hello"
        //I'm trying to get the string of "hello", not simply the index.
        //here's why i think the top works. selectedIndex returns an int.
        //if i try and use the toString() method it isn't clear
        //that I'm trying to target the value of the element
        //within the dropDown object, but for some reason, with
        //the first chain of logic, the chain is clear to the compiler
        //that I'm targeting the assigned value of the selected index.
      //if the time counter for both minutes and seconds has reached zero,
      //then I'm calling clearInterval to get rid of the betInterval.
      //if seconds counter equals zero but the master counter doesn't,
      //meaning that there are still minutes left to go,
      //then the timer's second are manually reset to 59
      //and minutes counter is subtracted by 1
      //if the seconds counter doesn't = 0 and master counter != 1,
      //then every second, subtract a value from the seconds counter and
      //reassign the seconds variable to equal secondscounter.

    let betInterval = setInterval(() => {
      let counter = 0;
      if (secondsCounter === 0 && minuteCounter === 0) {
        timerMinute.innerText = "0";
        timerSecond.innerText = "00";
        counter = 1;
        let winner = document.getElementById("winner");
        //coin price, coin name, player
        let coinPricePercent1 = parseFloat(document.getElementById("toFill1").innerText) / coinPrice1 - 1;
        let coinPricePercent2 = parseFloat(document.getElementById("toFill2").innerText) / coinPrice2 - 1;
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


  //make function getCoin1. This function will access the API of
  //coin market cap and pull the appropriate information to
  //find the latest price of each coin and display it to the user.
  //make a new xml object that will be a request to process to
  //JSON. name this request
  //assign a const var to the url to access with request object
  //assign an event listener to request so that when it's done loading
  //its xml is parsed into json, a var called name is set to object.data
  //set i = var number which is what's passed into getCoin1 (amount of
  //coin to buy)
  //if the status of the object is set to 200 OK, then
  //run through name (array of coin data), increment i,
  //increment so that i doesn't start at 0, you
  //then target each element option in dropdown by id, where
  //id is equal to the increment number idOfOptions++
  //the goal is to target these and assign their value
  //equal to that of the 'id' number given in the json
  //data array, where all of these are the returned coins.
  //once this is set, then each options inner text will
  //be changed to match the string name in the json of the
  //returned coins, all of these coins are organized by
  //current coin price with BTC and ETH at the top.
  //before the loadend is complete, commands of request.open()
  //and request.send are executed to get the xml info from the API



  function getCoin1(number) {
    let request = new XMLHttpRequest();
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5&CMC_PRO_API_KEY=${process.env.API_KEY}`;
    request.addEventListener("loadend", function () {
      const receivedCoinArray = JSON.parse(this.responseText);
      let name = receivedCoinArray.data;
      let idOfOptions = number;
      if (this.status === 200) {
        name.forEach(element => {
          idOfOptions++; //to start this at 1 vs 0
          let optionToSet = document.getElementById(`${i}`);
          optionToSet.setAttribute("value", `${element.id}`);
          optionToSet.innerText = `${element.name}`;
        });
      }
    });
    request.open("GET", url, true);
    request.send();
  }

  getCoin1(0);
  getCoin1(5);

  //because we set limit equal to 5 with CMC api, the list
  //returned back to us only contains 5 elements.
  //this is why when we run through it it only goes for 5 times,
  //and we need to call getCoin1 twice, the first time to
  //seed top 5 coins in drop down 1, second time to seed
  //top 5 coins in drop down 2.

  //set an event listener for the drop down 1 that listens for its change
  //on change, executes function that increments startbetcounter, a
  //global variable. Normally you would fix by targeting a globally defined
  //object with
  //startBetCounter as its sole key/value, and then increment its value
  //you increment to check on change if both of the drop downs have been
  //altered. If they have been, then the initialize game button will
  //become activated by removing disabled.
  //once changed, after change price is called to update the
  //coin price in the UI. An interval is set to every 60 seconds
  //where it will call afterchangeprice again to update UI
  //as latest CMC api is set to update every 60 seconds


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

//the above is repeated for coin2, where its called every 60 seconds.

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

  //afterChangePrice is a function that takes in the string id of
  //the select button as well
  //as the id of the span to target and update in the UI
  //once again it locally assigns coinvalue to be equal to
  //the passed in id of the dropdown, it sets coinID equal to the
  //id assigned to the dropdown item as value, and it
  //queries the api for CMC and gets back the necessary coin info
  //for the chosen coin by its internal CMC ID.
  //if the status is good, then it updates the UI to the price
  //of the returned item. It also sets the dropDown menu for
  //coins to disabled if the status comes back 200.

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

  //once the time has been set, then the user is able to input coin selection
  //although this process should be reversed for optimal UI.

  document.getElementById("selectLengthBet").addEventListener("change", () => {
    document.getElementById("coins1").removeAttribute("disabled", "");
    document.getElementById("coins2").removeAttribute("disabled", "");
    document.getElementById("selectLengthBet").setAttribute("disabled", "");
  });

});


