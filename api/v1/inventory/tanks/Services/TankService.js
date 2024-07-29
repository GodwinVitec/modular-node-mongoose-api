const BaseService = require('../../../BaseService');
const TankRepository = require('../Repositories/TankRepository');

class TankService extends BaseService {
  constructor() {
    super();
    this.tankRepository = new TankRepository();
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
}

module.exports = TankService;