import { Coffee, Menu } from "./coffee";
import { Shop } from "./itemshop";

export interface Customer {
  name: string;
  log: string;
  imgSrc: string;
  preferredCoffees: Coffee[];
  visited: boolean;
}

export function createCustomer(
  name: string,
  log: string,
  imgSrc: string,
  preferredCoffees: Coffee[],
): Customer {
  return { name, log, imgSrc, preferredCoffees, visited: false };
}

export function visitShop(
  customer: Customer,
  shop: Shop,
  menu: Menu,
  order: Coffee,
): void {
  customer.visited = true;
  menu.buyCoffee(order, shop);
}

export function displayCustomer(customer: Customer): HTMLDivElement {
  const div = document.createElement("div");
  div.classList.add("customer");
  const img = document.createElement("img");
  const text = document.createElement("div");
  const name = document.createElement("h2");
  const log = document.createElement("div");
  setInterval(() => {
    if (div.classList.contains("visited")) {
      return;
    }
    if (customer.visited) {
      div.classList.add("visited");
      img.src = customer.imgSrc;
      name.textContent = customer.name;
      log.textContent = customer.log;
    } else {
      // img.src = img.unknownCustomer;
      name.textContent = "???";
      log.textContent = "??? ??? ???";
    }
  }, 500);
  text.append(name, log);
  div.append(img, text);
  return div;
}

export function possibleCustomers(
  customers: Customer[],
  menu: Menu,
): Customer[] {
  return customers.filter((customer) => {
    return (
      !customer.visited &&
      customer.preferredCoffees.some((coffee) => menu.coffeeAvailable(coffee))
    );
  });
}
