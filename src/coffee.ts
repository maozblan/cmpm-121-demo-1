import { Item } from "./itemshop";

interface Coffee {
  name: string;
  description: string;
  imgSrc: string;
  cost: number;
  recipe: Ingredient[];
}

interface Ingredient {
  item: Item;
  profile: {
    // on scale -5 to 5
    sweet: number;
    creamy: number;
    strength: number;
    happiness: number;
  };
}

const MAX_MENU_SLOTS: number = 6;

export class Menu {
  private menu: {
    coffee: Coffee;
    cost: number;
    bought: boolean;
  }[];
  private menuSlots: {
    coffee: Coffee | null;
    display: {
      name: HTMLHeadingElement;
      content: HTMLDivElement;
    };
    available: boolean;
    bought: boolean;
  }[]; 

  constructor() {
    this.menu = [];
    this.menuSlots = [];
    for (let i = 0; i < MAX_MENU_SLOTS; i++) {
      this.menuSlots.push({
        coffee: null,
        display: {
          name: document.createElement("h2"),
          content: document.createElement("div"),
        },
        available: false,
        bought: false,
      });
    }
  }

  addCoffee(coffee: Coffee): void {
    this.menu.push({ coffee: coffee, cost: coffee.cost, bought: false });

    // display coffee
  }
}
