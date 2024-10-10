import "./style.css";
import "./sidebar.css";
import {
  Item,
  ItemData,
  clicker,
  counter,
  rateDisplay,
  createItem,
  setItemList,
} from "./shop.ts";
import { addTab, createSidebar, createTab, Sidebar, Tab } from "./sidebar.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boopadoop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const graphics: HTMLDivElement = document.createElement("div");
app.append(graphics);

const sidebar: Sidebar = createSidebar("sidebar");
app.append(sidebar.sidebar);

const shop: Tab = createTab("shop", "shop.png");
addTab(sidebar, shop);

shop.content.append(clicker);
shop.content.append(counter);

const upgrades: ItemData[] = [
  {
    name: "fertilizer",
    description: "faster, faster",
    cost: 10,
    efficiency: 0.1,
    numBought: 0,
  },
  {
    name: "clouds",
    description: "finally, some rain",
    cost: 20,
    efficiency: 0.5,
    numBought: 0,
  },
  {
    name: "pots",
    description: "and another one",
    cost: 50,
    efficiency: 1,
    numBought: 0,
  },
  {
    name: "gardens",
    description: "slowly lighting up the sky",
    cost: 100,
    efficiency: 7,
    numBought: 0,
  },
  {
    name: "greenhouses",
    description: "a little bit of the cosmos",
    cost: 1000,
    efficiency: 100,
    numBought: 0,
  },
];

((): void => {
  const itemList: Item[] = [];
  upgrades.forEach((upgrade: ItemData) => {
    const temp: Item = createItem(upgrade);

    // add to shop.contentlication
    for (const item of Object.values(temp.display)) {
      shop.content.append(item);
    }
    itemList.push(temp);
  });
  setItemList(itemList);
})();

shop.content.append(rateDisplay);
