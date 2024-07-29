const BaseTransformer = require("../../../BaseTransformer");
const Commons = require("../../../../helpers/commons");
const DateTimeHelper = require("../../../../helpers/datetime");

class TankTransformer extends BaseTransformer {
  constructor() {
    super();

    this.commonHelper = new Commons();
    this.datetimeHelper = new DateTimeHelper();
  }

  transform = tank => ({
    id: tank._id,
    name: tank.name,
    category: tank.category,
    dimensions: {
      width: tank.width,
      height: tank.height,
      length: tank.length
    },
    shootingRange: tank.shootingRange,
    status: tank.status,
    lastMaintenance: this.commonHelper.empty(tank.lastMaintenance) ?
      null : this.datetimeHelper.formatDateTime(tank.lastMaintenance.toString()),
  });
}

module.exports = TankTransformer;