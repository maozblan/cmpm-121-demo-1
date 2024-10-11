import { currencyCount, Item, Shop, updateCurrencyCount } from "./itemshop";

export interface Coffee {
  name: string;
  description: string;
  imgSrc: string;
  recipe: Ingredient[];
}

interface Ingredient {
  item: Item;
  count: number;
}

interface MenuItem {
  coffee: Coffee;
  content: HTMLDivElement;
  cost: number;
  available: boolean;
  bought: boolean;
}

export class Menu {
  private menu: MenuItem[];
  menuDisplay: HTMLDivElement;

  constructor() {
    this.menuDisplay = document.createElement("div");
    this.menu = [];
  }

  addCoffee(coffee: Coffee): void {
    // display coffee
    const div = document.createElement("div");
    div.classList.add("coffee");
    const img = document.createElement("img");
    img.src = coffee.imgSrc;
    div.append(img);
    const text = document.createElement("div");
    const name = document.createElement("h2");
    name.textContent = coffee.name;
    const description = document.createElement("div");
    description.textContent = coffee.description;
    const recipe = document.createElement("div");
    recipe.textContent = `recipe: ${coffee.recipe.map((item) => `${item.count} ${item.item.name}`).join(", ")}`;
    text.append(name, description, recipe);
    div.append(text);

    // add coffee to menu
    const item: MenuItem = {
      coffee: coffee,
      content: div,
      cost: this.menu.length * 125,
      available: false,
      bought: false,
    };
    this.menu.push(item);

    // missing ingredients warning
    const warning: HTMLDivElement = document.createElement("div");
    warning.classList.add("warning");
    setInterval(() => {
      if (!this.checkIngredients(item) && item.bought) {
        warning.textContent = "missing ingredients!";
        item.available = false;
      } else {
        warning.textContent = "";
        item.available = item.bought;
      }
    }, 250);
    div.append(warning);

    // logic for purchase
    const cover = document.createElement("div");
    cover.classList.add("cover");
    const coverText = document.createElement("h1");
    coverText.textContent = `purchase recipe for: ${this.menu[this.menu.length - 1].cost} lyztes`;
    cover.addEventListener("click", () => {
      if (this.purchaseRecipe(item)) {
        cover.remove();
        item.bought = true;
      }
    });
    cover.append(coverText);
    div.append(cover);

    this.menuDisplay.append(div);
  }

  purchaseRecipe(item: MenuItem): boolean {
    if (currencyCount >= item.cost) {
      updateCurrencyCount(-item.cost);
      return true;
    }
    return false;
  }

  buyCoffee(coffee: Coffee, shop: Shop): boolean {
    const item = this.menu.find((item) => item.coffee === coffee);
    if (item && item.available) {
      for (const ingredient of item.coffee.recipe) {
        shop.use(ingredient.item, ingredient.count);
      }
      return true;
    }
    return false;
  }

  private checkIngredients(item: MenuItem): boolean {
    for (const ingredient of item.coffee.recipe) {
      if (ingredient.item.numBought < ingredient.count) {
        return false;
      }
    }
    return true;
  }
}
