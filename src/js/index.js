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
  request.addEventListener("loadend", function() {
    const receivedCoin = JSON.parse(this.responseText);
    let name = receivedCoin.data[0].name;
    
    console.log(name);
    if (this.status === 200) {
      console.log("hello1");
    }
  });
  request.open("GET", url, true);
  request.send();
}

getCoin1();




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