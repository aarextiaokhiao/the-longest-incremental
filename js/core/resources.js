/* ---=- RESOURCES -=--- */
const RESOURCES = {};
class Resource {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.parent = data.parent;
    this.src = data.src;
    this.production = data.production ?? (() => D(0)); //production function

    RESOURCES[this.id] = this;
  }

  get amount() {
    return D(this.parent()?.[this.src] ?? 0);
  }

  set(newAmount) {
    this.parent()[this.src] = D(newAmount);
  }

  add(amount) {
    this.set(this.amount.add(amount));
  }

  sub(amount) {
    this.set(this.amount.sub(amount));
  }

  gt(x) {
    return this.amount.gt(x);
  }

  gte(x) {
    return this.amount.gte(x);
  }
}

//SCRIPTS
function getResource(x) {
  return RESOURCES[x]
}