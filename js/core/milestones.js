const MILESTONE_GROUPS = {};
const MILESTONES = {};

class Milestone extends GroupCore {
  constructor(data) {
    super(data, MILESTONES);
    this.req = data.req
  }

  got() {
    return this.res.gte(this.req)
  }
}
