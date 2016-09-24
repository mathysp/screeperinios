var upgrader = {
  parts: [
      [MOVE, CARRY, WORK],
      [MOVE, CARRY, WORK, MOVE, CARRY],
      [MOVE, CARRY, WORK, MOVE, CARRY, WORK]
  ],

  action: function () {

    var creep = this.creep;

    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('Recharging!');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('Upgrading!');
    }

    if(creep.memory.upgrading) {
      // Go upgradestuff
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else {
      var storages = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION
              || structure.structureType == STRUCTURE_SPAWN)
              && structure.energy > 0;
        }
      })
      if(creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storages[0]);
      }
    }

  }


};

module.exports = upgrader;