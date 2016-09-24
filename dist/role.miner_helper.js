var helper = {
  parts: [
      [MOVE, CARRY, MOVE, CARRY]
  ],

  assignMiner: function() {
    var creep = this.creep;

    var miner = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
      filter: function(miner) {
        if(miner.memory.role == 'miner' && miner.memory.helpers.length < miner.memory.helpersNeeded)
          return true;

        return false;
      }
    });

 /*   var miner = creep.pos.findNearest(Game.MY_CREEPS, {
      filter: function(miner) {
        if(miner.memory.role == 'miner' && miner.memory.helpers.length < miner.memory.helpersNeeded)
            return true;

        return false;
      }
    });*/

    if(miner == undefined)
        return;

    creep.memory.miner = miner.id;
    miner.memory.helpers.push(creep.id);
  },


  attach: function () {
    var creep = this.creep;

    if (creep.memory.courier !== undefined && creep.memory.courier == true) {
      creep.memory.courier = false;
      return;
    }

    if(creep.memory.miner == undefined)
        this.assignMiner();

    var miner = Game.getObjectById(creep.memory.miner);

    if(miner == null) {
      creep.suicide();
      return;
    }

    if(creep.energy < creep.energyCapacity) {
      if(creep.pos.isNearTo(miner)) {
        var energy = creep.pos.findInRange(Game.DROPPED_ENERGY, 1)[0];
        creep.pickup(energy);
      } else {
        if(miner.memory.isNearSource)
            creep.moveTo(miner);
      }

      return;
    }

    var target = null;

    // Drop Off energy
    return;
  }


};

module.exports = helper;