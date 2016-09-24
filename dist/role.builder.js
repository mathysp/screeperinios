var builder = {
  parts: [
    [WORK, WORK, CARRY, CARRY, MOVE],
//		[Game.WORK,Game.WORK,Game.CARRY,Game.CARRY,Game.MOVE, Game.MOVE, Game.CARRY],
//		[Game.WORK,Game.WORK,Game.CARRY,Game.CARRY,Game.MOVE, Game.MOVE, Game.CARRY, Game.MOVE],
//		[Game.WORK,Game.WORK,Game.CARRY,Game.CARRY,Game.MOVE, Game.MOVE, Game.CARRY, Game.MOVE, Game.WORK],
//		[Game.WORK,Game.WORK,Game.CARRY,Game.CARRY,Game.MOVE, Game.MOVE, Game.CARRY, Game.MOVE, Game.WORK, Game.MOVE],
//		[Game.WORK,Game.WORK,Game.CARRY,Game.CARRY,Game.MOVE, Game.MOVE, Game.CARRY, Game.MOVE, Game.WORK, Game.MOVE, Game.CARRY]
  ],


  action: function() {

    if(creep.carry.energy == 0) {
      var closestSpawn = creep.pos.findClosestByPath(STRUCTURE_SPAWN)
      creep.moveTo(closestSpawn);
      closestSpawn.transferEnergy(creep);
    } else {
      // Repairing Half Damaged building
      var damagedBuildings = creep.room.find(FIND_MY_STRUCTURES);
      var toRepaid = [ ];
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
      var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if(target) {
        if(!creep.pos.isNearTo(target))
            creep.moveTo(target);
        
        creep.build(target);
        return;
      }

    }




  }




};

module.exports = builder;