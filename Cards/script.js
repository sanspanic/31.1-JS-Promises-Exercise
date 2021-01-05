let baseURL = "http://deckofcardsapi.com/api/deck";
let deckID;

//1.

axios
  .get(`${baseURL}/new/shuffle/?deck_count=1`)
  .then((res) => {
    deckID = res.data.deck_id;
    return axios.get(`${baseURL}/${deckID}/draw/?count=1`);
  })
  .then((res) => {
    console.log(res.data.cards[0].value, res.data.cards[0].suit);
  });

// 2.

let drawnCardsPromises = [];

axios.get(`${baseURL}/new/shuffle/?deck_count=1`).then((res) => {
  deckID = res.data.deck_id;
  for (i = 1; i < 3; i++) {
    drawnCardsPromises.push(axios.get(`${baseURL}/${deckID}/draw/?count=1`));
  }
  Promise.all(drawnCardsPromises).then((res) => {
    res.forEach((res) =>
      console.log(res.data.cards[0].value, res.data.cards[0].suit)
    );
  });
});
