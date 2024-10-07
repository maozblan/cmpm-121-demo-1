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
clicker.onclick = () => {
  coffeeCount++;
  counter.textContent = `${coffeeCount} coffees`;
};
app.append(clicker);

// coffee counter
const counter: HTMLDivElement = document.createElement("div");
let coffeeCount: number = 0;
counter.textContent = `${coffeeCount} coffees`;
app.append(counter);
