var builder = {
  parts: [
    [MOVE, CARRY, WORK],
    [MOVE, CARRY, WORK, CARRY, WORK]
  ],


  action: function() {
    var creep = this.creep;

    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('Recharging!');
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('Building!');
    }

    if(creep.memory.building) {
      // Repairing Half Damaged building
      var damagedBuildings = creep.room.find(FIND_MY_STRUCTURES);
      var toRepair = [ ];
      for(var index in damagedBuildings)
        if((damagedBuildings[index].hits / damagedBuildings[index].hitsMax) < 0.5)
          toRepair.push(damagedBuildings[index]);

      if(toRepair.length) {
        var structure = toRepair[0];
        creep.moveTo(structure);
        creep.repair(structure);

        return;
      }

      // Go build stuff
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
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

module.exports = builder;