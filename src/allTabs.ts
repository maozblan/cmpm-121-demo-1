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
      garden.content.append(item);
    }
    itemList.push(temp);
  });
  setItemList(itemList);
})();

garden.content.append(rateDisplay);

// garden /////////////////////////////////////////////////////////////////////
