var proto = {
  /**
   * The creep for this role
   *
   * @type creep
   */
  creep: null,

  /**
   * Set the creep for this role
   *
   * @param {Creep} creep
   */
  setCreep: function (creep) {
    this.creep = creep;
    return this;
  },

  run: function () {
    if(this.creep.memory.onSpawned == undefined) {
      this.onSpawn();
      this.creep.memory.onSpawned = true;
    }

    this.action(this.creep);

    if(this.creep.ticksToLive = 1)
      this.beforeAge();
  },

  getParts: function() {
    var _ = require('lodash');

    var room;
    for(var index in Game.rooms) {
      room = Game.rooms[index]
    }

    var extensions = room.find(FIND_STRUCTURES,  {
      filter: (structure) => {
        return structure.structureType == STRUCTURE_EXTENSION && structure.energy >= 200;
      }
    }).length;
   /* var extensions = Game.getRoom('1-1').find(Game.MY_STRUCTURES, {
      filter: function(structure)
      {
        return (structure.structureType == Game.STRUCTURE_EXTENSION && structure.energy >= 200);
      }
    }).length;*/

    var parts = _.cloneDeep(this.parts);
    if(typeof parts[0] != "object")
      return this.parts;

    parts.reverse();

    for(var i in parts) {
      if((parts[i].length - 5) <= extensions) {
        return parts[i].toUpperCase();
      }
    }
  },

  action: function() { },

  onSpawn: function() { },

  beforeAge: function() { }

};

module.exports = proto;