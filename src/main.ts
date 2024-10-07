import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boopadoop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clicker: HTMLButtonElement = document.createElement("button");
clicker.textContent = "☕"; // coffee emoji (it's just small)
app.append(clicker);
