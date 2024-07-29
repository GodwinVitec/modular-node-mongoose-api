const BaseService = require('../../../BaseService');
const TankRepository = require('../Repositories/TankRepository');
const Commons = require('../../../../helpers/commons');

class TankService extends BaseService {
  constructor() {
    super();
    this.tankRepository = new TankRepository();
    this.commonHelper = new Commons();
  }

  getTanks = async () => {
    const tanks = await this.tankRepository.getTanks();

    return this.success(
      true,
      'Tanks retrieved successfully',
      tanks
    );
  };


  addTank = async (tankData) => {
    try {
      const tank = await this.tankRepository.create({
        ...tankData,
        status: 'INACTIVE',
      });

      return this.success(
        true,
        'Tank added successfully',
        tank
      );
    } catch (err) {
      return this.error(
        false,
        ['Failed to add tank'],
        err
      );
    }
  }

  updateTank = async (id, tankData) => {
    try {
      const updatedTank = await this.tankRepository.update(
        {_id: id},
        {...tankData},
        {
          new: true
        }
      );

      return this.success(
        true,
        "Tank updated successfully",
        updatedTank
      );
    } catch (error) {
      return this.error(
        false,
        [error.message],
        error
      );
    }
  }

  updateTanks = async (filter, tankData) => {
    return await this.tankRepository.update(
      {...filter},
      {...tankData}
    );
  }

  destroyTank = async (id) => {
    try {
      const destroyResponse = await this.tankRepository.destroy(
        {_id: id}
      );

      if (this.commonHelper.empty(destroyResponse?._id)) {
        return this.error(
          false,
          ["Failed  to destroy tank. Tank not found."]
        );
      }

      return this.success(
        true,
        "Tank destroyed successfully."
      );
    } catch (error) {
      return this.error(
        false,
        ["An error occurred.", error.message]
      );
    }
  }
}

module.exports = TankService;