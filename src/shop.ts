// clicker button
/**
 * main clicker button that the player clicks on
 */
export const clicker: HTMLButtonElement = document.createElement("button");
const clickerImg: HTMLImageElement = document.createElement("img");
clickerImg.src = "./assets/lyzte.png";
clickerImg.width = clickerImg.height = 100;
clicker.addEventListener("click", () => {
  increment(1);
});
clicker.append(clickerImg);

// coffee counter
/**
 * current count of currency
 */
export const counter: HTMLDivElement = document.createElement("div");
let currencyCount: number = 0;
counter.textContent = `${currencyCount.toFixed(2)} lyztes`;

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
/**
 * full item
 */
export interface Item extends ItemData {
  display: {
    button: HTMLButtonElement;
    description: HTMLDivElement;
    cost: HTMLDivElement;
  };
}

/**
 * only item data
 */
export interface ItemData {
  name: string;
  description: string;
  cost: number;
  efficiency: number;
  numBought: number;
}

/**
 * create display divs for item with given item data
 * @param item Item Data
 * @returns Full Item
 */
export function createItem(item: ItemData): Item {
  // create display elements
  const temp: Item = {
    ...item,
    display: {
      button: document.createElement("button"),
      description: document.createElement("div"),
      cost: document.createElement("div"),
    },
  };

  // link purchase of item
  temp.display.button.addEventListener("click", () => {
    purchase(temp);
  });

  // input description
  temp.display.description.textContent = item.description;

  return temp;
}

function purchase(item: Item): void {
  currencyCount -= item.cost;
  item.numBought++;
  item.cost *= 1.15;
  updateRate(item.efficiency);
  update();
}

let itemList: Item[];
/**
 * set full list of items in shop that will be continuously updated
 * @param list full list of items
 */
export function setItemList(list: Item[]): void {
  itemList = list;
}

function update(): void {
  for (const item of itemList) {
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

/**
 * display for the current currency increase rate
 */
export const rateDisplay: HTMLDivElement = document.createElement("div");
rateDisplay.textContent = `rate: ${rate.toFixed(1)} lyztes per second`;
rateDisplay.style.marginTop = "30px";
