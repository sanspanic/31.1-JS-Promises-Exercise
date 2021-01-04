console.log("connected");

let favNr = 4;
let baseURL = "http://numbersapi.com";

// 1.
$.getJSON(`${baseURL}/${favNr}?json`).then((data) => {
  console.log(data);
});

axios.get(`${baseURL}/${favNr}?json`).then((res) => {
  console.log(res.data);
});

// 2.
favNrArr = [2, 4, 16];
$.getJSON(`${baseURL}/${favNrArr}?json`).then((data) => {
  console.log(data);
});

axios.get(`${baseURL}/${favNrArr}?json`).then((res) => {
  console.log(res.data);
});

// 3.

let fourFactsPromises = [];
for (let i = 1; i < 5; i++) {
  fourFactsPromises.push(axios.get(`${baseURL}/${favNr}?json`));
}

Promise.all(fourFactsPromises).then(function (res) {
  res.forEach((res) => console.log(res.data.text));
});
