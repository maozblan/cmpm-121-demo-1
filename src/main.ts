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

// upgrader
class BaseUpgrade {
  private _name: string;
  private _cost: number;
  private _efficiency: number;
  private _button: HTMLButtonElement;
  private _display: HTMLDivElement;
  upgradesBought: number;

  constructor(name: string, baseCost: number, efficiency: number) {
    this._name = name;
    this._cost = baseCost;
    this._efficiency = efficiency;
    this.upgradesBought = 0;
    this._button = document.createElement("button");
    this._button.addEventListener("click", () => {
      this.buyUpgrade();
    });
    this.updateButton();
    this._display = document.createElement("div");
    this.updateDisplay();
  }

  get name(): string {
    return this._name;
  }

  get cost(): number {
    return this._cost;
  }

  get efficency(): number {
    return this._efficiency;
  }

  get button(): HTMLButtonElement {
    return this._button;
  }

  get display(): HTMLDivElement {
    return this._display;
  }

  set buttonText(text: string) {
    this._button.textContent = text;
  }

  buyUpgrade(): void {
    currencyCount -= this._cost;
    this.upgradesBought++;
    this._cost *= 1.15;
    updateRate(this.efficency);
    this.updateButton();
    this.updateDisplay();
  }

  updateButton(): void {
    this.buttonText = `${this._name} (cost ${this._cost.toFixed(2)} lyztes)`;
    this._button.disabled = currencyCount < this._cost;
  }

  updateDisplay(): void {
    this._display.textContent = `${this.name}: ${this.upgradesBought}`;
  }
}

// items
interface Item {
  name: string;
  cost: number;
  efficiency: number;
}

const availableItems: Item[] = [
  { name: "pots", cost: 10, efficiency: 0.1 },
  { name: "gardens", cost: 100, efficiency: 2 },
  { name: "greenhouses", cost: 1000, efficiency: 50 },
];

function createItem(itemList: Item[]): BaseUpgrade[] {
  const upgrades: BaseUpgrade[] = [];
  for (const item of itemList) {
    upgrades.push(new BaseUpgrade(item.name, item.cost, item.efficiency));
  }
  for (const item of upgrades) {
    app.append(item.button);
    app.append(item.display);
  }
  return upgrades;
}

const upgrades: BaseUpgrade[] = createItem(availableItems);

function update(): void {
  if (!upgrades) return;
  for (const upgrade of upgrades) {
    upgrade.updateButton();
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
