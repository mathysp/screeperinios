var countType = require('countType');

module.exports = {
  states: [
      // [RoomLevel, [unit, order]]
      {level: 1, creepList: ['miner', 'miner', 'upgrader', 'builder', 'upgrader']},
      {level: 2, creepList: ['miner', 'miner', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader']},
      {level: 3, creepList: ['miner', 'miner', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader']},
      {level: 4, creepList: ['miner', 'miner', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader', 'builder', 'upgrader']},
      {level: 5, creepList: ['miner', 'miner', 'upgrader', 'builder', 'upgrader']},
      {level: 6, creepList: ['miner', 'miner', 'upgrader', 'builder', 'upgrader']},
      {level: 7, creepList: ['miner', 'miner', 'upgrader', 'builder', 'upgrader']}
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

    if(Memory.currentRoomLevel == undefined)
      Memory.currentRoomLevel = 1;

    if(Memory.requiredCreeps == undefined) {
      var states = this.states;
      var currentState = states[0];
      Memory.requiredCreeps = currentState.creepList;
    }
  },

  updateMemory: function () {
    var room = null;
    for(var index in Game.rooms) {
      room = Game.rooms[index];
    }

    var roomControllerLevel = room.controller.level;
    if(Memory.currentRoomLevel != roomControllerLevel) {
      //var memory = this.memory;

      var states = this.states;
      var currentState = states[roomControllerLevel];
      Memory.requiredCreeps = currentState.creepList;

      Memory.currentRoomLevel = roomControllerLevel;
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

