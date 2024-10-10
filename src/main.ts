import "./style.css";
import { sidebar } from "./allTabs";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boopadoop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const graphics: HTMLDivElement = document.createElement("div");
app.append(graphics);

app.append(sidebar.sidebar);
document.getElementById("garden")?.click();
