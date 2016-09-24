var warrior = {
  parts: [
      [MOVE, MOVE, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH]
  ],

  action: function () {
    var creep = this.creep;

    var targets = creep.room.find(FIND_HOSTILE_CREEPS || FIND_HOSTILE_STRUCTURES || FIND_HOSTILE_CONSTRUCTION_SITES || FIND_HOSTILE_SPAWNS);
    if(targets.length) {
      if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    } else {
      this.rest();
    }

  }

};

module.exports = warrior;