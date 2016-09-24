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


  action: function () {
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

    if(creep.carry.energy < creep.carryCapacity) {
      if(creep.pos.isNearTo(miner)) {
        var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1)[0];
        creep.pickup(energy);
      } else {
        if(miner.memory.isNearSource)
            creep.moveTo(miner);
      }

      return;
    }

    // Drop Off energy
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
      }
    })
    if(targets.length > 0) {
      if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    }

  }


};

module.exports = helper;