const BaseController = require('../../../BaseController');
const TankService = require('../Services/TankService');
const TankTransformer = require('../Transformers/TankTransformer');

class TankController extends BaseController{
  constructor() {
    super();
    this.tankService = new TankService();
    this.tankTransformer = new TankTransformer();
  }

  index = async (req, res) => {
    const tanks = await this.tankService.getTanks();

    if (tanks.status !== true) {
      return this.fail(
        res,
        tanks.error,
        tanks.trace
      );
    }

    return this.success(
      res,
      'Tanks retrieved successfully',
      tanks.data
    );
  };

  addTank = async (req, res) => {
    const tank = await this.tankService.addTank(req.body);

    console.log(req.body);

    if (tank.status !== true) {
      return this.fail(
        res,
        tank.error,
        tank.trace
      );
    }

    return this.success(
      res,
      'Tank added successfully',
      this.tankTransformer.transform(tank.data)
    );
  }
}

module.exports = TankController;