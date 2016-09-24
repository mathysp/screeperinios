/**
 * This guy just finds a source, and stays near it. His job is just to mine away and let the energy fall on the ground
 *
 * @param creep
 */
var miner = {
  parts: [
      [MOVE, WORK, WORK, WORK, WORK]
  ],

  getOpenSource: function() {
    var creep = this.creep;

    var source = creep.pos.findNearest(Game.SOURCES, {
      filter: function(source) {
        if(Memory.sources[source.id] == undefined
            || Memory.sources[source.id].miner == undefined
            || Memory.sources[source.id].miner == creep.id)
            return true;

        if(Game.getObjectById(Memory.sources[source.id].minder) == null)
            return true;

        return false;
      }
    });
    return source;
  },

  setSourceToMine: function (source) {
    var creep = this.creep;

    if(!source)
        return;

    if(Memory.sources[source.id] == undefined)
      Memory.sources[source.id] = { id : source.id };

    Memory.sources[source.id].miner = creep.id;
    creep.memory.source = source.id;

    var helperSpawn = source.pos.findNearest(Game.MY_SPAWN);
    var steps = helperSpawn.pos.findPathTo(source).length * 2;
    var creepsNeeded = Math.round((steps * 8) / 100);

    if(creepsNeeded > 5)
        creepsNeeded = 5;

    for(var i = 0; i < creepsNeeded; i++)
        Memory.spawnQueue.unshift({ type: 'miner_helper', memory: {
          miner: creep.id
        }});

    creep.memory.helpersNeeded = creepsNeeded;
  },


  onSpawn: function () {
    var creep = this.creep;

    creep.memory.isNearSource = false;
    creep.memory.helpers = [ ];

    var source = this.getOpenSource();
    this.setSourceToMine(source);

    creep.memory.onCreated = true;
  },

  action: function () {
    var creep = this.creep;

    var source = Game.getObjectById(creep.memory.source);

    if(source == null) {
      var source = this.getOpenSource();

      if(!source)
          return;

      this.setSourceToMine(source);
    }

    if(creep.pos.inRangeTo(source, 5))
        creep.memory.isNearSource = true;
    else
      creep.memory.isNearSource = false;

     if(Memory.sources[source.id] == undefined)
         Memory.sources[source.id] = { id: source.id };

    Memory.sources[source.id].minder = creep.id;

    creep.moveTo(source);
    creep.harvest(source);
  }

};

module.exports = miner;