import "./style.css";
import { sidebar } from "./allTabs";
import { graphics } from "./graphics";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boopadoop";
document.title = gameName;

// const header = document.createElement("h1");
// header.innerHTML = gameName;
// app.append(header);

// append graphics
app.append(graphics);
graphics.id = "graphics";

// append sidebar
app.append(sidebar.sidebar);
sidebar.sidebar.id = "sidebar";

// open sidebar on load
document.getElementById("garden")?.click();
