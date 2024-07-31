const BaseController = require('../../../BaseController');
const TankService = require('../Services/TankService');
const TankTransformer = require('../Transformers/TankTransformer');
const Commons = require('../../../../helpers/commons');

class TankController extends BaseController{
  constructor() {
    super();

    this.tankService = new TankService();
    this.tankTransformer = new TankTransformer();
    this.commonHelper = new Commons();
  }

  index = async (req, res) => {
    const tanks = await this.tankService.getTanks();

    if (tanks.status !== true) {
      return this.fail(
        res,
        tanks.errors,
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
    const validated = req.validated;

    console.log(validated);
    const tank = await this.tankService.addTank(validated);

    if (tank.status !== true) {
      return this.fail(
        res,
        tank.errors,
        tank.trace
      );
    }

    return this.success(
      res,
      'Tank added successfully',
      this.tankTransformer.transform(tank.data)
    );
  }

  updateTank = async (req, res) => {
    try {
      const {id} = req.params;

      if (this.commonHelper.empty(id))
      {
        return this.fail(
          res,
          "Please specify the ID of the tank",
        );
      }

      const validated = req.validated;
      console.log(validated);

      const updateResponse = await this.tankService.updateTank(
        id,
        {...validated}
      );

      if (updateResponse.status !== true) {
        return this.fail(
          res,
          updateResponse.errors,
          updateResponse.trace
        );
      }

      if (this.commonHelper.empty(updateResponse?.data?.id)) {
        return this.fail(
          res,
          "Failed  to update tank. Tank not found."
        );
      }

      return this.success(
        res,
        updateResponse.message,
        this.tankTransformer.transform(updateResponse.data)
      );
    } catch (error) {
      return this.fail(
        res,
        error.message,
        error
      );
    }
  }

  destroyTank = async (req, res) => {
    try {
      const {id} = req.params;

      if (this.commonHelper.empty(id))
      {
        return this.fail(
          res,
          "Please specify the ID of the tank",
        );
      }

      const destroyResponse = await this.tankService.destroyTank(id);

      if (destroyResponse.status !== true) {
        return this.fail(
          res,
          destroyResponse.errors,
          destroyResponse.trace
        );
      }

      return this.success(
        res,
        destroyResponse.message
      );
    } catch (error) {
      return this.fail(
        res,
        error.message,
        error
      );
    }
  }
}

module.exports = TankController;