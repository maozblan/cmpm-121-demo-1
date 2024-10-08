import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boopadoop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// clicker button
const clicker: HTMLButtonElement = document.createElement("button");
clicker.textContent = "☕"; // coffee emoji (it's just small)
clicker.addEventListener("click", () => {
  incrementCoffeeCount(1);
});
app.append(clicker);

// coffee counter
const counter: HTMLDivElement = document.createElement("div");
let coffeeCount: number = 0;
counter.textContent = `${coffeeCount} coffees`;
app.append(counter);

// automatic incrementer
let lastTimeStamp: number;
function continuousCoffeeGrowth(): void {
  // first run
  if (lastTimeStamp === undefined) {
    lastTimeStamp = performance.now();
    requestAnimationFrame(continuousCoffeeGrowth);
    return;
  }

  // looping
  requestAnimationFrame(continuousCoffeeGrowth);

  const currentTimeStamp: number = performance.now();
  const secElapsed: number = (currentTimeStamp - lastTimeStamp) / 1000;
  incrementCoffeeCount(secElapsed * rate);
  lastTimeStamp = currentTimeStamp;
}
requestAnimationFrame(continuousCoffeeGrowth);

function incrementCoffeeCount(amount: number): void {
  coffeeCount += amount;
  counter.textContent = `${Math.floor(coffeeCount)} coffees`;
  update();
}

// upgrader
interface Upgrade {
  name: string;
  cost: number;
  efficency: number; // in units per second
  button: HTMLButtonElement;
  display: HTMLDivElement;
  upgradesBought: number;
}

class BaseUpgrade implements Upgrade {
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
    coffeeCount -= this._cost;
    this.upgradesBought++;
    updateRate(this.efficency);
    this.updateButton();
    this.updateDisplay();
  }

  updateButton(): void {
    this.buttonText = `${this._name} (cost ${this._cost} coffees)`;
    this._button.disabled = coffeeCount < this._cost;
  }

  updateDisplay(): void {
    this._display.textContent = `${this.name}: ${this.upgradesBought}`;
  }
}

let rate: number = 0;
function updateRate(amount: number): void {
  rate += amount;
  rateDisplay.textContent = `rate: ${rate.toFixed(1)} coffees per second`;
}

const upgradeA: BaseUpgrade = new BaseUpgrade("upgradeA", 10, 0.1);
app.append(upgradeA.button);
app.append(upgradeA.display);
const upgradeB: BaseUpgrade = new BaseUpgrade("upgradeB", 100, 2);
app.append(upgradeB.button);
app.append(upgradeB.display);
const upgradeC: BaseUpgrade = new BaseUpgrade("upgradeC", 1000, 50);
app.append(upgradeC.button);
app.append(upgradeC.display);

function update(): void {
  upgradeA.updateButton();
  upgradeB.updateButton();
  upgradeC.updateButton();
}

const rateDisplay: HTMLDivElement = document.createElement("div");
rateDisplay.textContent = `rate: ${rate.toFixed(1)} coffees per second`;
rateDisplay.style.marginTop = "30px";
app.append(rateDisplay);
