/* ---=- LAYERS -=--- */
class Layer {
  constructor(data) {
    this.layer = data.layer
    this.playerParent = data.playerParent
    this.playerId = data.playerId
  }

  get player() {
    return this.playerParent?.[this.playerId]
  }
  get unl() {
    return this.player.unl
  }
}