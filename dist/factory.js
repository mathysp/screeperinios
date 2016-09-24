var countType = require('countType');

module.exports = {
  init: function () {
    if(Memory.factoryInit != undefined)
        return;

    Memory.factoryInit = true;
    this.memory();
  },

  run: function () {
    this.spawnRequiredCreeps();
  },

  memory: function () {
    if(Memory.spawnQueue == undefined)
        Memory.spawnQueue = [ ];

    if(Memory.sources == undefined)
        Memory.sources = { };

    if(Memory.requiredCreeps == undefined) {
      Memory.requiredCreeps = [
        'miner', // 1
        'builder', // 1
        'miner',  // 2
        'builder' // 2

      ];
    }
  },

  spawnRequiredCreeps: function () {

    // Memory Clearing
    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    var requiredCreeps = Memory.requiredCreeps;

    var gatheredCreeps = { };
    for(var index in requiredCreeps) {
      var type = requiredCreeps[index];
      if(gatheredCreeps[type] == undefined)
          gatheredCreeps[type] = 0;

      var neededToSkip = gatheredCreeps[type] + 1;

      var found = countType(type, true);
      if(neededToSkip > found) {
        Memory.spawnQueue.push(type);
      }

      gatheredCreeps[type]++;
    }
  }
};

