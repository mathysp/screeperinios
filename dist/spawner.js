module.exports = {

  initSpawnQueue: function() {
    if(Memory.spawnQueue == undefined)
        Memory.spawnQueue = [ ];
  },

  addToQueue: function() {
    this.initSpawnQueue();

    if(unshift != undefined && unshift === true)
        Memory.spawnQueue.unshift(creep);
    else
        Memory.spawnQueue.push(creep);
  },

  spawnNextInQueue: function () {
    this.initSpawnQueue();

    if(!Memory.spawnQueue.length)
        return;

    var spawns = null;
    for(var index in Game.rooms) {
      var room = Game.rooms[index];
      spawns = room.find(FIND_MY_SPAWNS, {
        filter: function(spawn) {
          return spawn.spawning === undefined || spawn.spawning === null;
        }});
    }
   /* var spawns = Game.getRoom('1-1').find(Game.MY_SPAWNS, {
        filter: function(spawn) {
          return spawn.spawning === undefined || spawn.spawning === null;
        }
    });*/

    if(!spawns.length)
        return;

    var role = Memory.spawnQueue[0];

    if(typeof role == "string") {
      role = { type: role, memory: { } };
    }

    var me = this;
    var toSpawnAt = spawns.filter(function (spawn) {
      return me.canSpawn(spawn, role.type);
    });

    if(!toSpawnAt.length)
        return;
    
    toSpawnAt = toSpawnAt[0];
    
    this.spawn(role.type, role.memory, toSpawnAt);
    
    Memory.spawnQueue.shift();
  },
  
  spawn: function (role, memory, spawnPoint) {
    if(!spawnPoint)
        spawnPoint = Game.spawns.spawn1;
    
    var manager = require('roleManager');
    
    if(!manager.roleExists(role))
        return;
    
    if(!this.canSpawn(spawnPoint, role))
        return;
    
    if(memory == undefined)
        memory = { };
    
    memory['role'] = role;
    
    var nameCount = 0
    var name = null;
    while(name == null) {
      nameCount ++;
      var tryName = role + nameCount;
      if(Game.creeps[tryName] == undefined)
          name = tryName;
    }
    
    if(spawnPoint.createCreep(manager.getRoleBodyParts(role), name, memory))
        console.log('Spawning ' + role);
  },

  canSpawn: function (spawnPoint, role) {
    if(typeof spawnPoint == "string" && role == undefined) {
      role = spawnPoint;
      spawnPoint = Game.spawns.spawn1;
    }

    return spawnPoint.energy >= this.spawnCost(role)
      && (spawnPoint.spawning == null
        || spawnPoint.spawning == undefined);
  },

  spawnCost: function(role) {
    var manager = require('roleManager');
    var parts = manager.getRoleBodyParts(role);

    var total = 0;
    for(var index in parts) {
      var part = parts[index];
      switch(part) {
        case MOVE:
          total += 50
          break;
        case CARRY:
          total += 50
          break;
        case WORK:
          total += 20
          break;
      }
    }
    return total;
  },

  killAll: function(role) {
    for(var i in Game.creeps) {
      if(role == undefined || Game.creeps[i].memory.role == role)
        Game.creeps[i].suicide();
    }
  }

};