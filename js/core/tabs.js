// this will NOT WORK
const TABS = {};
const TAB_STACK = [];
const TAB_SHOWN = {};

class Tab {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.html = data.html;
    this.update = data.update;
    this.unlocked = data.unlocked;
    this.subtabs = data.subtabs ?? [];

    TABS[data.id] = this
    if (data.parent) data.parent.subtabs.push(this);
  }
}

//SCRIPTS
function setupTab(id) {
  const tab = TABS[id]
  let div = document.createElement("tab-disp")

  let html = tab.html
  html += "<br><br><div class='tabs'>"
  for (let i of tab.subtabs) html += `<tab-btn tab='${i.id}'><button id="tab_btn_${i.id}" onclick="switchTab('${tab.id}', '${i.id}')">${i.name}</button></tab-btn>`
  html += "</div>"
  div.innerHTML = html

  el("tab_area").append(div)
  div.setAttribute("tab", id)
  div.id = "tab_"+id

  if (!TAB_SHOWN[id] && tab.subtabs[0]) TAB_SHOWN[id] = tab.subtabs[0].id
  if (TAB_SHOWN[id]) setupTab(TAB_SHOWN[id])
}

function switchTab(name, tab) {
  if (TAB_SHOWN[name] == tab) return

  let subtab = TAB_SHOWN[name]
  while (subtab) {
    el("tab_"+subtab).remove()
    subtab = TAB_SHOWN[subtab]
  }

  TAB_SHOWN[name] = tab
  setupTab(tab)

  htmlInterval()
}