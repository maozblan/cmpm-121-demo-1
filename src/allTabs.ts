import {
  Garden,
  ItemData,
  Shop,
  clicker,
  counter,
  rateDisplay,
} from "./itemshop.ts";
import { addTab, createSidebar, createTab, Sidebar, Tab } from "./sidebar.ts";
import "./sidebar.css";
import { img } from "./images.ts";

// garden /////////////////////////////////////////////////////////////////////

export const sidebar: Sidebar = createSidebar("sidebar");
const garden: Tab = createTab("garden", "garden.png");
addTab(sidebar, garden);

garden.content.append(clicker);
garden.content.append(counter());

garden.content.append(rateDisplay);

const upgrades: ItemData[] = [
  {
    name: "fertilizer",
    description: "faster, faster",
    imgSrc: img.lyzte,
    cost: 10,
    efficiency: 0.1,
  },
  {
    name: "cloud",
    description: "finally, some rain",
    imgSrc: img.lyzte,
    cost: 20,
    efficiency: 0.5,
  },
  {
    name: "pot",
    description: "and another one",
    imgSrc: img.lyzte,
    cost: 50,
    efficiency: 1,
  },
  {
    name: "garden",
    description: "slowly lighting up the sky",
    imgSrc: img.lyzte,
    cost: 100,
    efficiency: 7,
  },
  {
    name: "greenhouse",
    description: "a little bit of the cosmos",
    imgSrc: img.lyzte,
    cost: 1000,
    efficiency: 100,
  },
];

const gardenShop = new Garden(upgrades);
const gardenShopDisplay: HTMLDivElement = document.createElement("div");
gardenShop.displayItems(gardenShopDisplay);
gardenShopDisplay.classList.add("itemShop");

garden.content.append(gardenShopDisplay);

// shop ///////////////////////////////////////////////////////////////////////

const shop: Tab = createTab("shop", "shop.png");
const shopTitle: HTMLHeadingElement = document.createElement("h2");
shopTitle.textContent = "item shop";
shop.content.append(shopTitle);
shop.content.append(counter());
addTab(sidebar, shop);

const shopItems: ItemData[] = [
  {
    name: "coffee bean",
    description: "the foundation of everything",
    imgSrc: img.lyzte,
    cost: 1,
    batchSize: 15,
  },
  {
    name: "milk",
    description: "fresh from the milky way",
    imgSrc: img.lyzte,
    cost: 5,
    batchSize: 5,
  },
  {
    name: "sugar",
    description: "the sweetest thing",
    imgSrc: img.lyzte,
    cost: 5,
    batchSize: 5,
  },
  {
    name: "cynnamon",
    description: "a little bit of spice",
    imgSrc: img.lyzte,
    cost: 10,
    batchSize: 10,
  },
  {
    name: "xin",
    description: "something new, something special",
    imgSrc: img.lyzte,
    cost: 10,
    batchSize: 10,
  },
  {
    name: "long berry",
    description: "the bitter taste of longing",
    imgSrc: img.lyzte,
    cost: 10,
    batchSize: 10,
  },
  {
    name: "ramfoam",
    description: "nostalgia and memories",
    imgSrc: img.lyzte,
    cost: 300,
    batchSize: 10,
  },
  {
    name: "mint leaves",
    description: "a breath of fresh air",
    imgSrc: img.lyzte,
    cost: 300,
    batchSize: 10,
  },
  {
    name: "starfruit",
    description: "a peek into history",
    imgSrc: img.lyzte,
    cost: 300,
    batchSize: 10,
  },
];

const itemShop = new Shop(shopItems);
const itemShopDisplay: HTMLDivElement = document.createElement("div");
itemShop.displayItems(itemShopDisplay);
itemShopDisplay.classList.add("itemShop");

shop.content.append(itemShopDisplay);
