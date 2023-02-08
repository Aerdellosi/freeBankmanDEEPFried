import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';


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

function getCoin1() {
  let request = new XMLHttpRequest();
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5&CMC_PRO_API_KEY=${process.env.API_KEY}`;
  console.log("hello2");
  request.addEventListener("loadend", function () {
    const receivedCoinArray = JSON.parse(this.responseText);
    let name = receivedCoinArray.data;
    let i = 0;
    console.log(name);
    if (this.status === 200) {
      name.forEach(element => {
        console.log("spin");
        i++;
        let x = document.getElementById(`${i}`);
        x.setAttribute("value", `${element.id}`);
        x.innerText = `${element.name}`
      });
    }
  });
  request.open("GET", url, true);
  request.send();
}

getCoin1();

document.getElementById("coins").addEventListener("change", function () {
  let coinValue = document.getElementById("coins");
  let coinID = (coinValue[coinValue.selectedIndex].value);
  let request = new XMLHttpRequest();
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${coinID}&CMC_PRO_API_KEY=${process.env.API_KEY}`;
  console.log(url);
  request.addEventListener("loadend", function () {
    const selectedCoin = JSON.parse(this.responseText);
    let coinPrice = selectedCoin.data[coinID].quote.USD.price;
    if (this.status === 200) {
      document.getElementById("toFill").innerText = coinPrice;
      let x = document.getElementById("coins");
      x.setAttribute("disabled", "");
      setInterval(() => {
        console.log("hi")
        request.addEventListener("loadend", function () {
          const selectedCoin = JSON.parse(this.responseText);
          let coinPrice = selectedCoin.data[coinID].quote.USD.price;
          if (this.status === 200) {
            document.getElementById("toFill").innerText = coinPrice;
          }
        });










        request.open("GET", url, true);
        request.send();

      }, 61000);
    }

  });

  request.open("GET", url, true);
  request.send();
});



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