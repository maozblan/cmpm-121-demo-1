import { Garden, ItemData, clicker, counter, rateDisplay } from "./itemshop.ts";
import { addTab, createSidebar, createTab, Sidebar, Tab } from "./sidebar.ts";
import "./sidebar.css";

// garden /////////////////////////////////////////////////////////////////////

export const sidebar: Sidebar = createSidebar("sidebar");
const garden: Tab = createTab("garden", "garden.png");
addTab(sidebar, garden);

garden.content.append(clicker);
garden.content.append(counter);

const upgrades: ItemData[] = [
  {
    name: "fertilizer",
    description: "faster, faster",
    imgSrc: "./assets/lyzte.png",
    cost: 10,
    efficiency: 0.1,
    numBought: 0,
  },
  {
    name: "clouds",
    description: "finally, some rain",
    imgSrc: "./assets/lyzte.png",
    cost: 20,
    efficiency: 0.5,
    numBought: 0,
  },
  {
    name: "pot",
    description: "and another one",
    imgSrc: "./assets/lyzte.png",
    cost: 50,
    efficiency: 1,
    numBought: 0,
  },
  {
    name: "garden",
    description: "slowly lighting up the sky",
    imgSrc: "./assets/lyzte.png",
    cost: 100,
    efficiency: 7,
    numBought: 0,
  },
  {
    name: "greenhouse",
    description: "a little bit of the cosmos",
    imgSrc: "./assets/lyzte.png",
    cost: 1000,
    efficiency: 100,
    numBought: 0,
  },
];

const gardenShop = new Garden(upgrades);
const gardenShopDisplay: HTMLDivElement = document.createElement("div");
gardenShop.displayItems(gardenShopDisplay);
gardenShopDisplay.classList.add("itemShop");

garden.content.append(gardenShopDisplay);

garden.content.append(rateDisplay);

// shop ///////////////////////////////////////////////////////////////////////

// const shop: Tab = createTab("shop", "shop.png");

// const shopItems: ItemData[] = [
//   {
//     name: "
//   }
// ];
