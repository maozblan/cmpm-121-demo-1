export interface Tab {
  id: string;
  tab: HTMLDivElement; // holds the clickable icon
  icon: HTMLImageElement; // icon image
  content: HTMLDivElement; // holds the content that goes in sidebar
}

export class Sidebar {
  id: string;
  sidebar: HTMLDivElement; // full sidebar
  content: HTMLDivElement; // what's inside the sidebar
  tabContainer: HTMLDivElement; // div of all the tabs
  tabs: Tab[];

  constructor(id: string) {
    this.id = id;
    this.sidebar = document.createElement("div");
    this.sidebar.id = this.id;
    this.sidebar.classList.add("sidebar");

    this.content = document.createElement("div");
    this.content.id = `${id}Content`;
    this.content.classList.add("sidebarContent");
    this.sidebar.append(this.content);

    this.tabContainer = document.createElement("div");
    this.tabContainer.id = `${id}Tabs`;
    this.tabContainer.classList.add("tabContainer");
    this.sidebar.append(this.tabContainer);

    this.tabs = [];
  }

  createTab(id: string, iconPath: string): Tab {
    const tab = document.createElement("div");
    tab.id = id;
    tab.classList.add("tab");
    const icon = document.createElement("img");
    icon.src = iconPath;
    tab.append(icon);
    const tabContent = document.createElement("div");
    tabContent.id = `${id}Content`;
    tabContent.classList.add("tabContent");

    const newTab: Tab = { id, tab, icon, content: tabContent };
    this.tabs.push(newTab);
    this.#addTab(newTab);

    return newTab;
  }

  #addTab(tab: Tab): void {
    this.tabContainer.append(tab.tab);
    this.content.append(tab.content);
    this.tabs.push(tab);
    tab.tab.addEventListener("click", () => {
      this.#toggleSidebar(tab);
    });
  }

  #toggleSidebar(tab: Tab) {
    // close old tab if open
    const openTab: string | undefined = document.querySelector(".tab.open")?.id;
    document.querySelector(".tab.open")?.classList.remove("open");
    document.querySelector(".tabContent.open")?.classList.remove("open");

    if (openTab === tab.id) {
      // closing the sidebar if clicking the same active tab
      this.content.classList.remove("open");
    } else {
      this.content.classList.add("open");
      tab.tab.classList.add("open");
      tab.content.classList.add("open");
    }
  }
}
