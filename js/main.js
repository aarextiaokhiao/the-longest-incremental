//TABS
new Tab({
  id: "screen",
  name: "",
  html: `
    <resource-disp res='points'></resource-disp>
  `,
  subtabs: [
    new Tab({
      id: "main",
      name: "Main",
      html: `
        <buyable-disp group='main'></buyable-disp>
        <upgrade-disp group='main'></upgrade-disp>
      `,
    }),
    new Tab({
      id: "settings",
      name: "Settings",
      html: `
        No settings.
      `,
      subtabs: [
        new Tab({
          id: "settings_main",
          name: "Settings",
          html: `
            You aren't supposed to be here.
          `,
        }),
        new Tab({
          id: "credits",
          name: "Credits",
          html: `
            Aarex
          `,
        }),
        new Tab({
          id: "changelog",
          name: "Changelog",
          html: `
            <h2>v0.0</h2><br>Released.
          `,
        }),
      ]
    }),
    new Tab({
      id: "hidden",
      unlocked: false,
      name: "???",
      html: `
        <div id="random"></div>
      `,
      update() {
        el("random").write(Math.random())
      }
    }),
  ],
});

//RESOURCES
function getPointProduction() {
  let ret = D(0)
  ret = ret.add(getBuyableEffect('main', 0))
  ret = ret.add(getBuyableEffect('main', 1))
  ret = ret.add(getBuyableEffect('main', 2))

  if (hasUpgrade('main', 0)) ret = ret.mul(getUpgradeEffect('main', 0))
  if (hasUpgrade('main', 1)) ret = ret.mul(getUpgradeEffect('main', 1))
  return ret
}

const POINTS = new Resource({
  id: "points",
  name: "Points",
  parent: () => player,
  src: "points",

  production: getPointProduction
})

//BUYABLES
BUYABLE_GROUPS.main = new BuyableGroup({
  id: "main",
  playerData: () => player.buyables,
  defaultRes: POINTS
})

new Buyable({
  group: BUYABLE_GROUPS.main,
  name: "Maker",
  scaling: {
    base: 10,
    exp: 1.4
  },
  eff: {
    eff: (x) => x,
    desc: (x) => "+"+format(x)+"/s"
  }
})
new Buyable({
  group: BUYABLE_GROUPS.main,
  name: "Producer",
  scaling: {
    base: 250,
    exp: 1.6
  },
  eff: {
    eff: (x) => x.mul(10),
    desc: (x) => "+"+format(x)+"/s"
  }
})
new Buyable({
  group: BUYABLE_GROUPS.main,
  name: "Generator",
  scaling: {
    base: 1e4,
    exp: 1.8
  },
  eff: {
    eff: (x) => x.mul(100),
    desc: (x) => "+"+format(x)+"/s"
  }
})

//UPGRADES
UPGRADE_GROUPS.main = new UpgradeGroup({
  id: "main",
  playerData: () => player.upg,
  defaultRes: POINTS
})

new Upgrade({
  group: UPGRADE_GROUPS.main,
  desc: "Gain more points based on total buildings bought.",
  cost: D(1e3),
  eff: {
    eff: () => Object.values(player.buyables).reduce((a, b) => Decimal.add(a, b)),
    desc: (x) => format(x)+"x"
  }
})
new Upgrade({
  group: UPGRADE_GROUPS.main,
  desc: "Gain more points based on your points.",
  cost: D(1e4),
  eff: {
    eff: () => Decimal.add(player.points, 1).log10().add(1),
    desc: (x) => format(x)+"x"
  }
})

//final
document.body.onload = function () {
  el("loading").remove();
  switchTab("root", "screen");

  setInterval(function () {
    playerInterval();
    htmlInterval();
  }, 50);
  setInterval(function () {
    achInterval();
  }, 1e3);
};
