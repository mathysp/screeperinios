var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {

    /*
    Screep actions: idle, moving; harvesting, transfering
     */
 /*   if(creep.memory.action && creep.carry.energy == 0) {
      creep.memory.action = false;
      creep.say('harvesting');
    }
    if(!creep.memory.action && creep.carry.energy == creep.carryCapacity) {
      creep.memory.action = true;
      creep.say('building');
    }

*/


    if(creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);

      var randOffset = Math.floor(Math.random() * 4) + 1;
      if(randOffset == 1) {
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[1]);
        }
      } else {
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0]);
        }
      }


     /* var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
      if(target) {
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }*/


    } else {
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
  }
};

module.exports = roleHarvester;