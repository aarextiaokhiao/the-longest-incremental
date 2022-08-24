const ACHIEVEMENTS = {};
class Achievement {
  constructor(data) {
    this.cond = data.cond;
    this.desc = data.desc;
    this.reward = data.reward;

    ACHIEVEMENTS[data.id] = this;
  }

  get has() {
    return player.ach.includes(this.id);
  }

  grant(force = false) {
    if (!parse(this.req) || !force) return;
    if (this.has) return;
    player.ach.push(this.id);
  }
}

//Scripts
function hasAch(id) {
  return ACHIEVEMENTS[id].has;
}

function grantAch(id) {
  return ACHIEVEMENTS[id].grant(true);
}

function achInterval() {
  for (const [_, ach] of Object.entries(ACHIEVEMENTS)) ach.grant()
}