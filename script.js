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

//ASYNC INSTEAD OF PROMISES

let favNumber = 5;
let baseURL = "http://numbersapi.com";

// 1.
async function part1() {
  let res = await axios.get(`${baseURL}/${favNumber}?json`);
  console.log(res.data);
}
part1();

// 2.
const favNumbers = [2, 4, 16];
async function part2() {
  let res = await axios.get(`${baseURL}/${favNumbers}?json`);
  console.log(res.data);
}
part2();

// 3.
async function part3() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => axios.get(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach((res) => {
    $("body").append(`<p>${res.data.text}</p>`);
  });
}
part3();
