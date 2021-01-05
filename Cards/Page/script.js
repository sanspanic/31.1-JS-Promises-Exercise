const baseURL = "http://deckofcardsapi.com/api";
let deckID;
const btn = document.querySelector("button");
const cardWrapper = document.querySelector(".card").firstElementChild;

//load page, start new deck, update deckID
axios.get(`${baseURL}/deck/new/shuffle`).then((result) => {
  deckID = result.data.deck_id;
});

//add event listener to button
btn.addEventListener("click", function () {
  axios
    .get(`${baseURL}/deck/${deckID}/draw/?count=1`)
    .then((result) => {
      let imgSrc = result.data.cards[0].image;
      renderImg(imgSrc);
      let degree = getDegree();
      rotateImg(degree);
    })
    .catch((err) => {
      console.log(err);
      btn.innerText = "No more cards!";
    });
});

let renderImg = (imgSrc) => {
  const img = document.createElement("img");
  img.setAttribute("src", imgSrc);
  //cardWrapper.innerText = "";
  cardWrapper.append(img);
};

let getDegree = () => {
  let randNum = Math.floor(Math.random() * 46);
  let randSignNum = Math.random();
  let isPositive;
  randSignNum > 0.5 ? (isPositive = true) : (isPositive = false);
  if (!isPositive) {
    randNum = 0 - randNum;
  }
  return randNum;
};

let rotateImg = (degree) => {
  document.querySelector("img").style.transform = `rotate(${degree}deg)`;
};

//USING ASYNC INSTEAD OF PROMISES

$(function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  // 1.
  async function part1() {
    let res = await axios.get(`${baseURL}/new/draw/`);
    let { suit, value } = res.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }

  // 2.
  async function part2() {
    let res = await axios.get(`${baseURL}/new/draw/`);
    let deckId = res.data.deck_id;
    let res2 = await axios.get(`${baseURL}/${deckId}/draw/`);
    [res.data, res2.data].forEach((card) => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

  // 3.
  async function setup() {
    let $btn = $("button");
    let $cardArea = $("#card-area");

    let res = await axios.get(`${baseURL}/new/shuffle/`);
    let deckData = res.data;
    $btn.show().on("click", async function () {
      let res2 = await axios.get(`${baseURL}/${deckData.deck_id}/draw/`);
      let cardData = res2.data;
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $("<img>", {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
          },
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
  setup();
});
