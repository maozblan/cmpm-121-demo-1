import {
  Garden,
  Item,
  ItemData,
  Shop,
  clicker,
  counter,
  rateDisplay,
} from "./itemshop.ts";
import { addTab, createSidebar, createTab, Sidebar, Tab } from "./sidebar.ts";
import "./sidebar.css";
import { img } from "./images.ts";
import { Coffee, Menu } from "./coffee.ts";
import {
  createCustomer,
  Customer,
  displayCustomer,
  visitShop,
} from "./customer.ts";
import { addNotification } from "./main.ts";

// garden /////////////////////////////////////////////////////////////////////

export const sidebar: Sidebar = createSidebar("sidebar");
const gardenTAB: Tab = createTab("garden", img.gardenIcon);

addTab(sidebar, gardenTAB);

gardenTAB.content.append(clicker);
gardenTAB.content.append(counter());

gardenTAB.content.append(rateDisplay);

const upgrades: ItemData[] = [
  {
    name: "fertilizer",
    description: "faster, faster",
    imgSrc: img.fertilizer,
    cost: 10,
    efficiency: 0.1,
  },
  {
    name: "cloud",
    description: "finally, some rain",
    imgSrc: img.cloud,
    cost: 20,
    efficiency: 0.5,
  },
  {
    name: "pot",
    description: "and another one",
    imgSrc: img.pot,
    cost: 50,
    efficiency: 1,
  },
  {
    name: "garden",
    description: "slowly lighting up the sky",
    imgSrc: img.garden,
    cost: 100,
    efficiency: 7,
  },
  {
    name: "greenhouse",
    description: "a little bit of the cosmos",
    imgSrc: img.greenhouse,
    cost: 1000,
    efficiency: 100,
  },
];

const garden = new Garden(upgrades);
const gardenShopDisplay: HTMLDivElement = document.createElement("div");
garden.displayItems(gardenShopDisplay);
gardenShopDisplay.classList.add("itemShop");

gardenTAB.content.append(gardenShopDisplay);

// shop ///////////////////////////////////////////////////////////////////////

const inventoryTAB: Tab = createTab("inventory", img.shopIcon);
const shopTitle: HTMLHeadingElement = document.createElement("h2");
shopTitle.textContent = "item shop";
inventoryTAB.content.append(shopTitle);
inventoryTAB.content.append(counter());
addTab(sidebar, inventoryTAB);

const shopItems: ItemData[] = [
  {
    name: "coffee bean",
    description: "the foundation of everything",
    imgSrc: img.coffeeBean,
    cost: 1,
    batchSize: 15,
  },
  {
    name: "milk",
    description: "fresh from the milky way",
    imgSrc: img.milk,
    cost: 5,
    batchSize: 5,
  },
  {
    name: "sugar",
    description: "the sweetest thing",
    imgSrc: img.sugar,
    cost: 5,
    batchSize: 5,
  },
  {
    name: "cynnamon",
    description: "a little bit of spice",
    imgSrc: img.cynnamon,
    cost: 10,
    batchSize: 10,
  },
  // {
  //   name: "xin",
  //   description: "something new, something special",
  //   imgSrc: img.xin,
  //   cost: 10,
  //   batchSize: 10,
  // },
  {
    name: "long berri",
    description: "the bitter taste of longing",
    imgSrc: img.longBerri,
    cost: 10,
    batchSize: 10,
  },
  // {
  //   name: "ramfoam",
  //   description: "nostalgia and memories",
  //   imgSrc: img.ramfoam,
  //   cost: 300,
  //   batchSize: 10,
  // },
  // {
  //   name: "mint leaves",
  //   description: "a breath of fresh air",
  //   imgSrc: img.mintLeaves,
  //   cost: 300,
  //   batchSize: 10,
  // },
  {
    name: "starfruit",
    description: "a peek into history",
    imgSrc: img.starfruit,
    cost: 300,
    batchSize: 10,
  },
];

const itemShop = new Shop(shopItems);
const ingredients: Record<string, Item> = itemShop.shopItems;
const itemShopDisplay: HTMLDivElement = document.createElement("div");
itemShop.displayItems(itemShopDisplay);
itemShopDisplay.classList.add("itemShop");

inventoryTAB.content.append(itemShopDisplay);

// menu ///////////////////////////////////////////////////////////////////////

const menuTAB: Tab = createTab("menu", img.menuIcon);
const menuTitle: HTMLHeadingElement = document.createElement("h2");
menuTitle.textContent = "menu";
menuTAB.content.append(menuTitle);
// menu.content.append(counter());
addTab(sidebar, menuTAB);

const coffees: Coffee[] = [
  {
    name: "basic coffee",
    description: "like the old days",
    imgSrc: img.coffee,
    recipe: [{ item: ingredients["coffee bean"], count: 5 }],
  },
  {
    name: "basic latte",
    description: "swirls of milk",
    imgSrc: img.coffee,
    recipe: [
      { item: ingredients["coffee bean"], count: 3 },
      { item: ingredients["milk"], count: 2 },
    ],
  },
  {
    name: "basic cappuccino",
    description: "sweetness unmatched",
    imgSrc: img.coffee,
    recipe: [
      { item: ingredients["coffee bean"], count: 1 },
      { item: ingredients["sugar"], count: 4 },
    ],
  },
  {
    name: "tanget",
    description: "sweet and spicy",
    imgSrc: img.coffee,
    recipe: [
      { item: ingredients["coffee bean"], count: 1 },
      { item: ingredients["sugar"], count: 2 },
      { item: ingredients["cynnamon"], count: 2 },
    ],
  },
  // {
  //   name: "cermela latte",
  //   description: "a mountain of foam",
  //   imgSrc: img.coffee,
  //   recipe: [
  //     { item: ingredients["coffee bean"], count: 2 },
  //     { item: ingredients["sugar"], count: 3 },
  //     { item: ingredients["ramfoam"], count: 3 },
  //   ],
  // },
  {
    name: "comet coffee",
    description: "chasing the dream",
    imgSrc: img.coffee,
    recipe: [
      { item: ingredients["coffee bean"], count: 2 },
      { item: ingredients["milk"], count: 1 },
      { item: ingredients["long berri"], count: 1 },
      { item: ingredients["starfruit"], count: 2 },
    ],
  },
];

const coffeeShop = new Menu();
coffees.forEach((coffee: Coffee) => coffeeShop.addCoffee(coffee));

menuTAB.content.append(coffeeShop.menuDisplay);
menuTAB.content.append(coffeeShop.menuDisplay);

// customers //////////////////////////////////////////////////////////////////

const customerTAB: Tab = createTab("customers", img.customersIcon);
const customersTitle: HTMLHeadingElement = document.createElement("h2");
customersTitle.textContent = "visitor log";
customerTAB.content.append(customersTitle);

addTab(sidebar, customerTAB);

const customerList: Customer[] = [
  createCustomer("lydon", "am just a simple wanderer", img.person, [
    coffeeShop.menuItems["basic coffee"],
  ]),
  createCustomer("sama", "life is a bit funky sometimes", img.person, [
    coffeeShop.menuItems["basic coffee"],
    coffeeShop.menuItems["basic latte"],
  ]),
  createCustomer("jakk", "beep boop bop", img.person, [
    coffeeShop.menuItems["basic latte"],
  ]),
  createCustomer("leon", "anything really", img.person, [
    coffeeShop.menuItems["basic cappuccino"],
    coffeeShop.menuItems["tanget"],
  ]),
  createCustomer("janet", "perfection is i", img.person, [
    coffeeShop.menuItems["tanget"],
  ]),
  createCustomer("epoch", "he who tears space apart", img.person, [
    coffeeShop.menuItems["comet coffee"],
  ]),
];

function customerVisit() {
  const possible: Customer[] = customerList.filter((customer) => {
    return customer.preferredCoffees.some((coffee) =>
      coffeeShop.coffeeAvailable(coffee),
    );
  });

  if (possible.length > 0) {
    const customer: Customer =
      possible[Math.floor(Math.random() * possible.length)];
    const prefAvailable: Coffee[] = customer.preferredCoffees.filter((coffee) =>
      coffeeShop.coffeeAvailable(coffee),
    );
    const coffee: Coffee =
      prefAvailable[Math.floor(Math.random() * prefAvailable.length)];
    console.log(customer.name, "visiting shop for", coffee.name);
    addNotification(`${customer.name} visited the shop for ${coffee.name}`);
    visitShop(customer, itemShop, coffeeShop, coffee);
  } else {
    console.log("no one wants coffee");
  }

  // customers come every 1-10 seconds
  setTimeout(
    () => {
      customerVisit();
    },
    Math.random() * 9000 + 1000,
  );
}
customerVisit();

const customerDisplay: HTMLDivElement = document.createElement("div");
customerDisplay.classList.add("customerDisplay");
customerList.forEach((customer: Customer) => {
  customerDisplay.append(displayCustomer(customer));
});
customerTAB.content.append(customerDisplay);
