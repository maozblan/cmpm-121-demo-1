import "./style.css";
import "./graphics.css";
import { sidebar } from "./allTabs";
import { img } from "./images";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "coffee for the gone";
document.title = gameName;

// append graphics
const graphics: HTMLDivElement = document.createElement("div");
app.append(graphics);
graphics.id = "graphics";
const header = document.createElement("h1");
header.id = "gameName";
header.innerHTML = gameName;
graphics.append(header);

// coffee shop graphics
const coffeeShopImg: HTMLImageElement = document.createElement("img");
coffeeShopImg.src = img.coffeeShop;
coffeeShopImg.id = "coffeeShop";
graphics.append(coffeeShopImg);

const notifications: HTMLDivElement = document.createElement("div");
notifications.classList.add("notifications");
graphics.append(notifications);

export function addNotification(text: string): void {
  const notification: HTMLDivElement = document.createElement("div");
  notification.textContent = text;
  notifications.append(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// append sidebar
app.append(sidebar.sidebar);
sidebar.sidebar.id = "sidebar";

// open sidebar on load
document.getElementById("garden")?.click();
