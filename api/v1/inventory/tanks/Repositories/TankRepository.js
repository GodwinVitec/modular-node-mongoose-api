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

  async update(
    filter = {},
    update = {},
    options = {},
    isMany = false
  ) {
    if (this.commonHelper.empty(filter)) {
      throw new Error("The filter parameter is required.");
    }

    if(this.commonHelper.empty(update)) {
      throw new Error("The update parameter is required.");
    }

    if (!isMany) {
      return this.model.findOneAndUpdate(
        {...filter},
        {...update},
        {...options}
      );
    }

    return this.model.updateMany(
      {...filter},
      {...update},
      {...options}
    );
  }


  async destroy(
    filter = {},
    isMany = false
  ) {
    if (this.commonHelper.empty(filter)) {
      throw new Error("The filter parameter is required.");
    }

    if(!isMany) {
      return this.model.findOneAndDelete(
        {...filter}
      );
    }

    return this.model.deleteMany({...filter});
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