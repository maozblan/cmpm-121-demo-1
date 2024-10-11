import { img } from "./images";

class Graphics {
  private layers: HTMLDivElement[];
  private startingZIndex: number;
  container: HTMLDivElement; 

  constructor(container?: HTMLDivElement) {
    this.layers = [];
    this.container = container? container : document.createElement("div");
    this.startingZIndex = parseInt(this.container.style.zIndex);
  }

  get mazZIndex(): number {
    return this.layers.length - 1 + this.startingZIndex;
  }

  addLayer(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("graphicsLayer");
    div.style.position = "relative";
    div.style.width = "100%";
    div.style.height = "100%";
    
    // set layer height
    this.layers.push(div);
    div.style.zIndex = this.mazZIndex.toString();
    
    // add layer to graphics
    this.container.append(div);
    return div;
  }
}

export const graphics: HTMLDivElement = document.createElement("div");
const graphicsInstance: Graphics = new Graphics(graphics);
graphicsInstance.container.style.position = "relative";

// make layers
const background = graphicsInstance.addLayer();
const coffeeShop = graphicsInstance.addLayer();
// const customers = graphicsInstance.addLayer();
const notifications = graphicsInstance.addLayer();

const gameName: HTMLHeadingElement = document.createElement("h1");
gameName.textContent = document.title;
background.append(gameName);

const coffeShopImg: HTMLImageElement = document.createElement("img");
coffeShopImg.src = img.coffeeShop;
coffeeShop.append(coffeShopImg);

const nofiticationDisplay: HTMLDivElement = document.createElement("div");
nofiticationDisplay.classList.add("notifications");

export function addNotification(text: string): void {
  const notification: HTMLDivElement = document.createElement("div");
  notification.textContent = text;
  notifications.append(notification);
  setTimeout(() => {
    notification.remove();
  });
}

