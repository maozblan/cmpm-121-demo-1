import { img } from "./images";

// clicker button
/**
 * main clicker button that the player clicks on
 */
export const clicker: HTMLButtonElement = document.createElement("button");
const clickerImg: HTMLImageElement = document.createElement("img");
clickerImg.src = img.lzyte;
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

// items
/**
 * full item
 */
export interface Item extends ItemData {
  display: {
    name: HTMLHeadingElement;
    image: HTMLImageElement;
    description: HTMLDivElement;
    button: HTMLButtonElement;
    display: HTMLDivElement;
  };
}

/**
 * only item data
 */
export interface ItemData {
  name: string;
  description: string;
  cost: number;
  numBought: number;
  efficiency?: number;
  imgSrc: string;
}

class itemShop {
  content: HTMLDivElement;
  items: Item[];

  constructor(itemList: ItemData[]) {
    this.items = itemList.map((item: ItemData) => this.createItem(item));
    this.content = document.createElement("div");
    this.items.forEach((item: Item) => {
      for (const itemElement of Object.values(item.display)) {
        this.content.append(itemElement);
      }
    });
    setInterval(() => {
      this.update();
    }, 500);
  }

  purchase(item: Item): void {
    currencyCount -= item.cost;
    item.numBought++;
    item.cost *= 1.15;
    updateRate(item.efficiency ? item.efficiency : 0);
  }

  update(): void {
    return;
  }

  createItem(item: ItemData): Item {
    // create display elements
    const temp: Item = {
      ...item,
      display: {
        name: document.createElement("h2"),
        image: document.createElement("img"),
        description: document.createElement("div"),
        button: document.createElement("button"),
        display: document.createElement("div"),
      },
    };

    // link purchase of item
    temp.display.button.addEventListener("click", () => {
      this.purchase(temp);
    });

    // link data
    temp.display.name.textContent = item.name;
    temp.display.image.src = item.imgSrc;
    temp.display.description.textContent = item.description;

    return temp;
  }

  displayItems(container: HTMLDivElement): void {
    this.items.forEach((item: Item) => {
      const itemContainer: HTMLDivElement = document.createElement("div");
      itemContainer.classList.add("item");
      for (const itemElement of Object.values(item.display)) {
        itemContainer.append(itemElement);
      }
      container.append(itemContainer);
    });
  }
}

export class Shop extends itemShop {
  constructor(itemList: ItemData[]) {
    super(itemList);
  }

  update() {
    for (const item of this.items) {
      item.display.button.textContent = `purchase (cost ${item.cost.toFixed(2)} lyztes)`;
      item.display.button.disabled = currencyCount < item.cost;

      item.display.display.textContent = `currently own ${item.numBought} ${item.name}s`;
    }
  }
}

export class Garden extends itemShop {
  constructor(itemList: ItemData[]) {
    super(itemList);
  }

  update() {
    for (const item of this.items) {
      item.display.button.textContent = `purchase\n(${item.cost.toFixed(2)} lyztes)`;
      item.display.button.disabled = currencyCount < item.cost;

      item.display.display.textContent = `${item.name} bought: ${item.numBought}`;
    }
  }
}
