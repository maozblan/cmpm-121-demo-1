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
  description: string;
  cost: number;
  efficiency: number;
  display?: {
    button: HTMLButtonElement;
    description: HTMLDivElement;
    cost: HTMLDivElement;
  };
  numBought: number;
}

const availableItems: Item[] = [
  {
    name: "fertilizer",
    description: "faster, faster",
    cost: 10,
    efficiency: 0.1,
    numBought: 0,
  },
  {
    name: "clouds",
    description: "finally, some rain",
    cost: 20,
    efficiency: 0.5,
    numBought: 0,
  },
  {
    name: "pots",
    description: "and another one",
    cost: 50,
    efficiency: 1,
    numBought: 0,
  },
  {
    name: "gardens",
    description: "slowly lighting up the sky",
    cost: 100,
    efficiency: 7,
    numBought: 0,
  },
  {
    name: "greenhouses",
    description: "a little bit of the cosmos",
    cost: 1000,
    efficiency: 100,
    numBought: 0,
  },
];

function createItems(itemList: Item[]): void {
  for (const item of itemList) {
    // create display elements
    item.display = {
      button: document.createElement("button"),
      description: document.createElement("div"),
      cost: document.createElement("div"),
    };

    // link purchase of item
    item.display.button.addEventListener("click", () => {
      purchase(item);
    });

    // input description
    item.display.description.textContent = item.description;

    // add all display items to the interface
    for (const element of Object.values(item.display)) {
      app.append(element);
    }
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
    if (!item.display) continue;

    item.display.button.textContent = `${item.name} (cost ${item.cost.toFixed(2)} lyztes)`;
    item.display.button.disabled = currencyCount < item.cost;

    item.display.cost.textContent = `${item.name}: ${item.numBought}`;
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
