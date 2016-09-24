var countType = require('countType');

module.exports = {
  states: [
      // [RoomLevel, [unit, order]]
      {1: ['miner', 'miner', 'builder', 'upgrader', 'builder', 'upgrader']},
      {2: ['miner', 'miner', 'builder', 'upgrader', 'builder', 'upgrader']},
      {3: ['miner', 'miner', 'builder', 'upgrader', 'builder', 'upgrader']},
      {4: ['miner', 'miner', 'builder', 'upgrader', 'builder', 'upgrader']},
      {5: ['miner', 'miner', 'builder', 'upgrader', 'builder', 'upgrader']},
      {6: ['miner', 'miner', 'builder', 'upgrader', 'builder', 'upgrader']},
      {7: ['miner', 'miner', 'builder', 'upgrader', 'builder', 'upgrader']}
  ],

  init: function () {
    if(Memory.factoryInit != undefined)
        return;

    Memory.factoryInit = true;
    this.memory();
  },

  run: function () {
    this.updateMemory();
    this.spawnRequiredCreeps();
  },

  memory: function () {
    if(Memory.spawnQueue == undefined)
        Memory.spawnQueue = [ ];

    if(Memory.sources == undefined)
        Memory.sources = { };

    if(Memory.requiredCreeps == undefined) {
      /*Memory.requiredCreeps = [
        'miner', // 1
        'builder', // 1
        'upgrader', // 1
        'miner',  // 2
        'builder', // 2
        'upgrader' // 2
        'builder', // 3
        'upgrader' // 3
      ];*/
      Memory.requiredCreeps = states[1];
    }
  },

  updateMemory: function () {
    var room = null;
    for(var index in Game.rooms) {
      room = Game.rooms[index];
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

