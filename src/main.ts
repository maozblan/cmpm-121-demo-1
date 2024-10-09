import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boopadoop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// clicker button
const clicker: HTMLButtonElement = document.createElement("button");
const clickerImg: HTMLImageElement = document.createElement("img");
clickerImg.src = "assets/lyzte.png";
clickerImg.width = clickerImg.height = 100;
clicker.addEventListener("click", () => {
  increment(1);
});
app.append(clicker);
clicker.append(clickerImg);

// coffee counter
const counter: HTMLDivElement = document.createElement("div");
let currencyCount: number = 0;
counter.textContent = `${currencyCount.toFixed(2)} lyztes`;
app.append(counter);

// automatic incrementer
let lastTimeStamp: number;
function continuousGrowth(): void {
  // first run
  if (lastTimeStamp === undefined) {
    lastTimeStamp = performance.now();
    requestAnimationFrame(continuousGrowth);
    return;
  }

  // looping
  requestAnimationFrame(continuousGrowth);

  const currentTimeStamp: number = performance.now();
  const secElapsed: number = (currentTimeStamp - lastTimeStamp) / 1000;
  increment(secElapsed * rate);
  lastTimeStamp = currentTimeStamp;
}
requestAnimationFrame(continuousGrowth);

function increment(amount: number): void {
  currencyCount += amount;
  counter.textContent = `${currencyCount.toFixed(2)} lyztes`;
  update();
}

// items
interface Item {
  name: string;
  cost: number;
  efficiency: number;
  button: HTMLButtonElement;
  display: HTMLDivElement;
  numBought: number;
}

const availableItems: Item[] = [
  {
    name: "pots",
    cost: 10,
    efficiency: 0.1,
    button: document.createElement("button"),
    display: document.createElement("div"),
    numBought: 0,
  },
  {
    name: "gardens",
    cost: 100,
    efficiency: 2,
    button: document.createElement("button"),
    display: document.createElement("div"),
    numBought: 0,
  },
  {
    name: "greenhouses",
    cost: 1000,
    efficiency: 50,
    button: document.createElement("button"),
    display: document.createElement("div"),
    numBought: 0,
  },
];

function createItems(itemList: Item[]): void {
  for (const item of itemList) {
    item.button.addEventListener("click", () => {
      purchase(item);
    });
    app.append(item.button);
    app.append(item.display);
  }
}
createItems(availableItems);

function purchase(item: Item): void {
  currencyCount -= item.cost;
  item.numBought++;
  item.cost *= 1.15;
  updateRate(item.efficiency);
  update();
}

function update(): void {
  for (const item of availableItems) {
    item.button.textContent = `${item.name} (cost ${item.cost.toFixed(2)} lyztes)`;
    item.button.disabled = currencyCount < item.cost;

    item.display.textContent = `${item.name}: ${item.numBought}`;
  }
}

// rate display
let rate: number = 0;
function updateRate(amount: number): void {
  rate += amount;
  rateDisplay.textContent = `rate: ${rate.toFixed(1)} lyztes per second`;
}

const rateDisplay: HTMLDivElement = document.createElement("div");
rateDisplay.textContent = `rate: ${rate.toFixed(1)} lyztes per second`;
rateDisplay.style.marginTop = "30px";
app.append(rateDisplay);
