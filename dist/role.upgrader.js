var upgrader = {
  parts: [
      [MOVE, CARRY, WORK],
      [MOVE, CARRY, WORK, MOVE, CARRY],
      [MOVE, CARRY, WORK, MOVE, CARRY, WORK]
  ]

  action: function () {

    if(creep.carry.energy == 0) {
      var closestSpawn = creep.pos.findClosestByPath(STRUCTURE_SPAWN)
      creep.moveTo(closestSpawn);
      closestSpawn.transferEnergy(creep);
    } else {
      
    }



  }


};

module.exports = ugprader;