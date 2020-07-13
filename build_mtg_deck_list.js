const fs = require("fs").promises;

const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
const trace = (data) => {
  console.log(data);

  return data;
};

async function run(fileName) {
  const data = await fs.readFile(fileName, "utf8");

  const parentheticalRegex = /(.*) \(.*\)/;

  const deckText = pipe(
    (fileData) => fileData.split("\n"),
    (cards) => cards.map((card) => card.slice(0, card.indexOf(":"))),
    (cards) =>
      cards.map((card) => {
        const match = card.match(parentheticalRegex);

        if (!match) {
          return card;
        }

        return match[1];
      }),
    (cards) => cards.map((card) => `1x ${card}`),
    (cards) => cards.join("\n")
  )(data);

  pbcopy(deckText);

  console.log("Deck copied to clipboard!");
}

run(process.argv[2]);

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}
