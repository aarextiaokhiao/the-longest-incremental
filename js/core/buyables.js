/* ---=- GROUP -=--- */
class Group {
  constructor(data) {
    this.id = data.id;
    this.playerData = data.playerData;
    this.defaultRes = data.defaultRes;
    this.spendable = data.spendable; //default: true
  }

  get player() {
    return this.playerData();
  }
}

class GroupCore {
  constructor(data, group) {
    this.id = data.id;
    this.group = data.group;
    this.unlocked = data.unlocked ?? true;
    this.name = data.name;
    this.desc = data.desc;
    this.eff = data.eff;
    this.res = data.res ?? data.group.defaultRes;
    this.noSpend = this.noSpend;

    if (!group[data.group.id]) group[data.group.id] = {};
    if (!data.id) {
      data.id = Object.keys(group[data.group.id]).length;
      this.id = data.id
    }
    group[data.group.id][data.id] = this;
  }

  get player() {
    return this.group.player;
  }

  canBuy() {
    return this.res.gte(this.cost);
  }
}

/* ---=- BUYABLES -=--- */
const BUYABLE_GROUPS = {};
class BuyableGroup extends Group {
  constructor(data) {
    super(data)
    BUYABLE_GROUPS[data.id] = this
  }
}

const BUYABLES = {};
class Buyable extends GroupCore {
  constructor(data) {
    super(data, BUYABLES);
    this.scaling = data.scaling;
  }

  get cost() {
    let r = D(this.amount);
    const d = this.scaling;
    if (d.mul) r = r.mul(parse(d.mul));
    if (d.pow) r = r.pow(parse(d.pow));
    if (d.exp) r = D(parse(d.exp)).pow(r);
    r = r.mul(parse(d.base));
    return r;
  }

  get bulk() {
    let lvl = D(this.res);
    const d = this.scaling;
    lvl = lvl.div(parse(d.base));
    if (d.exp) lvl = lvl.log(parse(d.exp));
    if (d.pow) lvl = lvl.root(parse(d.pow));
    if (d.mul) lvl = lvl.div(parse(d.mul));
    return lvl;
  }

  get amount() {
    return D(this.player?.[this.id] ?? 0);
  }

  get effect() {
    return this.eff.eff(this.amount)
  }

  buy(max = false) {
    if (!this.canBuy()) return
    if (this.has) return
    if (!(parse(this.noSpend) ?? false)) this.res.sub(this.cost)
    this.player[this.id] = max ? this.bulk : this.amount.add(1)
  }
}

// SCRIPTS
function getBuyable(type, id) {
  return BUYABLES[type][id];
}

function buyBuyable(type, id) {
  return getBuyable(type, id).buy()
}

function getBuyableAmount(type, id) {
  return getBuyable(type, id).amount
}

function getBuyableEffect(type, id) {
  return getBuyable(type, id).effect
}

/* ---=- UPGRADES -=--- */
const UPGRADE_GROUPS = {};
class UpgradeGroup extends Group {
  constructor(data) {
    super(data)
    UPGRADE_GROUPS[data.id] = this
  }
}

const UPGRADES = {};
class Upgrade extends GroupCore {
  constructor(data) {
    super(data, UPGRADES);
    this.cost = data.cost;
  }

  get has() {
    return !!this.player?.[this.id] ?? true
  }

  get effect() {
    return this.eff.eff();
  }

  buy() {
    if (!this.canBuy()) return
    if (this.has) return
    this.player[this.id] = 1
    if (!(parse(this.noSpend) ?? false)) this.res.sub(this.cost)
  }
}

// SCRIPTS
function getUpgrade(type, id) {
  return UPGRADES[type][id];
}

function buyUpgrade(type, id) {
  return getUpgrade(type, id).buy()
}

function hasUpgrade(type, id) {
  return getUpgrade(type, id).has
}

function getUpgradeEffect(type, id) {
  return getUpgrade(type, id).effect
}