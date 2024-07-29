const Tank = require('../Models/Tank');
const TankTransformer = require('../Transformers/TankTransformer');
const Commons = require('../../../../helpers/commons');

class TankRepository {
  constructor() {
    this.model = Tank;

    this.commonHelper = new Commons();
  }

  async create(tankData) {
    return await this.model.create(tankData);
  }

  async getTanks(filter = {}) {
    let pipeline = [
      {
        $sort: {
          name: 1
        }
      }
    ];

    if (!this.commonHelper.empty(filter)) {
      pipeline.push({
        $match: [
          {...filter}
        ]
      },);
    }

    return await this.model.aggregate(pipeline)
      .then((data) => {
        return data.map(tank => (new TankTransformer).transform(tank));
      });
  }

  async getLongestToShortestTanks(filter = {}) {
    return await this.model.find(filter)
      .sort({length: -1})
      .exec();
  }

  async getTanksDescendingLength(filter = {}) {
    return await this.model.aggregate([
      {
        $sort: {
          length: -1
        }
      }
    ]).then((data) => {
      return data.map(tank => (new TankTransformer).transform(tank));
    });
  }

  async getLongestTankLength() {
    return this.model.aggregate([
      {$group: {_id: null, length: {$max: '$length'}}},
      {$project: {_id: 0, length: 1}}
    ]);
  }

}

module.exports = TankRepository;