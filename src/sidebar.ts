export interface Sidebar {
  id: string;
  sidebar: HTMLDivElement; // full sidebar
  content: HTMLDivElement; // what's inside the sidebar
  tabContainer: HTMLDivElement; // div of all the tabs
  tabs: Tab[];
}

export interface Tab {
  id: string;
  tab: HTMLDivElement; // holds the clickable icon
  icon: HTMLImageElement; // icon image
  content: HTMLDivElement; // holds the content that goes in sidebar
}

export function createSidebar(id: string): Sidebar {
  const div = document.createElement("div");
  div.id = id;
  div.classList.add("sidebar");
  const content = document.createElement("div");
  content.id = `${id}Content`;
  content.classList.add("sidebarContent");
  div.append(content);
  const tabContainer = document.createElement("div");
  tabContainer.id = `${id}Tabs`;
  tabContainer.classList.add("tabContainer");
  div.append(tabContainer);
  return { id, sidebar: div, content, tabContainer, tabs: [] };
}

export function createTab(id: string, iconPath: string): Tab {
  const tab = document.createElement("div");
  tab.id = id;
  tab.classList.add("tab");
  const icon = document.createElement("img");
  icon.src = iconPath;
  tab.append(icon);
  const tabContent = document.createElement("div");
  tabContent.id = `${id}Content`;
  tabContent.classList.add("tabContent");
  return { id, tab, icon, content: tabContent };
}

export function addTab(sidebar: Sidebar, tab: Tab): void {
  sidebar.tabContainer.append(tab.tab);
  sidebar.content.append(tab.content);
  sidebar.tabs.push(tab);
  tab.tab.addEventListener("click", () => {
    toggleSidebar(sidebar, tab);
  });
}

export function toggleSidebar(sidebar: Sidebar, tab: Tab) {
  // close old tab if open
  const openTab: string | undefined = document.querySelector(".tab.open")?.id;
  document.querySelector(".tab.open")?.classList.remove("open");
  document.querySelector(".tabContent.open")?.classList.remove("open");

  if (openTab === tab.id) {
    // closing the sidebar if clicking the same active tab
    sidebar.content.classList.remove("open");
  } else {
    sidebar.content.classList.add("open");
    tab.tab.classList.add("open");
    tab.content.classList.add("open");
  }
}
