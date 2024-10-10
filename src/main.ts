import "./style.css";
import {
  Item,
  ItemData,
  clicker,
  counter,
  rateDisplay,
  createItem,
  setItemList,
} from "./shop.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boopadoop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

app.append(clicker);
app.append(counter);

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

    // add to application
    for (const item of Object.values(temp.display)) {
      app.append(item);
    }
    itemList.push(temp);
  });
  setItemList(itemList);
})();

app.append(rateDisplay);
