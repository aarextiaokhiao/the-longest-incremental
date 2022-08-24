function htmlInterval() {
  //TABS
  for (const disp of document.getElementsByTagName("tab-btn")) {
    const tab = TABS[disp.getAttribute("tab")]
    new UtilElement(disp).setDisplay(parse(tab.unlocked) ?? true)
  }
  for (const disp of document.getElementsByTagName("tab-disp")) {
    const tab = TABS[disp.getAttribute("tab")]
    if (tab.update) tab.update()
  }

  //RESOURCES
  for (const disp of document.getElementsByTagName("resource-disp")) {
    const res = RESOURCES[disp.getAttribute("res")]
    if (!disp.setup) {
      disp.innerHTML = `You have <span id='res_${res.id}' style='font-size: 24px'></span> ${res.name} <span id='res_${res.id}_prod' style='font-size: 9px'></span>`
      disp.setup = true
    }
    el('res_'+res.id).write(format(res.amount))
    el('res_'+res.id+'_prod').write(res.production() ? " (+" + format(res.production()) + "/s)" : "")
  }

  //BUYABLES
  for (const disp of document.getElementsByTagName("buyable-disp")) {
    const groupId = disp.getAttribute("group")
    const group = BUYABLES[groupId]
    if (!disp.setup) {
      let html = ""
      for (const [id, buy] of Object.entries(group)) {
        html += `<tr id="${groupId}Buyable${id}">
          <td style='text-align: left; width: 120px'><b>${buy.name}</b>:</td>
          <td id="${groupId}BuyAmount${id}"  style='text-align: left; width: 60px'></td>
          <td style="font-size: 14px">(<span id="${groupId}BuyEff${id}"></span>)</td>
          <td>
            <button 
              id="${groupId}BuyButton${id}"
              class="upgbutton cannotbuy" 
              onclick="buyBuyable('${groupId}', '${id}')">
              Cost: <span id="${groupId}BuyCost${id}"></span>
              ${buy.res.name}
            </button>
          </td>
        </tr>`
      }
      disp.innerHTML = "<table>" + html + "</table>"
      disp.setup = true
    }

    for (const [id, buy] of Object.entries(group)) {
      updateBuyThings(groupId+"BuyButton"+id, buy.canBuy())
      el(groupId+"BuyAmount"+id).write(format(buy.amount, 0))
      el(groupId+"BuyEff"+id).write(buy.eff.desc(buy.effect))
      el(groupId+"BuyCost"+id).write(format(buy.cost, 0))
    }
  }

  //UPGRADES
  for (const disp of document.getElementsByTagName("upgrade-disp")) {
    const groupId = disp.getAttribute("group")
    const group = UPGRADES[groupId]
    if (!disp.setup) {
      let html = ""
      for (const [id, upg] of Object.entries(group)) {
        html += `<button 
          text-align="center"
          id="${groupId}Upg${id}" 
          class="u cannotbuy"
          onclick="buyUpgrade('${groupId}', '${id}')">
          ${upg.desc}<br><br>
          Cost: 
          <span id="${groupId}UpgCost${id}"></span>
          ${upg.res.name}`+
          (upg.eff?`<br><br>Currently: 
          <span
            id="${groupId}UpgEffect${id}">
          </span>`:``)+
        `</button>`
        if (id % 4 == 3) html += `<br>`
      }
      disp.innerHTML = html
      disp.setup = true
    }

    for (const [id, upg] of Object.entries(group)) {
      const has = hasUpgrade(groupId, id)
      el(groupId+"Upg"+id)[
        (has ? "add" : "remove") + "Classes"
      ]("bought");

      if (!has) updateBuyThings(groupId+"Upg"+id, upg.canBuy())
      else el(groupId+"Upg"+id).removeClasses("canbuy", "cannotbuy");

      el(groupId+"Upg"+id).setDisplay(parse(upg.unlocked) ?? true)
      el(groupId+"UpgCost"+id).write(format(upg.cost, 0))
      if (upg.eff) el(groupId+"UpgEffect"+id).write(upg.eff.desc(parse(upg.eff.eff)))
    }
  }
}