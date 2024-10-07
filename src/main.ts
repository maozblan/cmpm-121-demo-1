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
requestAnimationFrame(continuousCoffeeGrowth);
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
  incrementCoffeeCount((currentTimeStamp - lastTimeStamp) / 1000);
  lastTimeStamp = currentTimeStamp;
}

function incrementCoffeeCount(amount: number): void {
  coffeeCount += amount;
  counter.textContent = `${Math.floor(coffeeCount)} coffees`;
}
