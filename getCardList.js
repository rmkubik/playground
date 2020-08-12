var getCardlist = (searchTerm) => {
  var titles = document.querySelectorAll(".deck-view-title");
  var title = Array.from(titles).find((h1) =>
    h1.innerText.includes(searchTerm)
  );
  var cards = title.parentElement.parentElement.querySelectorAll(
    ".deck-col-card a"
  );
  var cardNames = Array.from(cards).map((card) => card.innerText);

  return cardNames;
};

// var cards = new Set();
// getCardlist('$50').forEach(card => cards.add(card));
// Array.from(cards).sort().join('\n\n');
