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
