const player = {
  points: D(10),
  buyables: { 0: D(0) },
  upg: {},

  lastTick: Date.now()
}

function playerInterval() {
  const now = Date.now()
  const diff = (now - player.lastTick) / 1e3
  player.lastTick = now

  for (const [_, res] of Object.entries(RESOURCES)) res.add(res.production().mul(diff))
}