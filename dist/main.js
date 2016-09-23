// Hello Game!

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

  // Memory Clearing
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }


  // Unit Role Object
  function unitrole(name, desiredNumber) {
    this.name = name;
    this.desiredNumber = desiredNumber;
  }

  // Roles object
  var roles = {
    builder: new unitrole('builder', 1),
    harvester: new unitrole('harvester', 1),
    upgrader: new unitrole('upgrader', 1)
  };

  for(var role in roles) {
    var units = _.filter(Game.creeps, (creep) => creep.memory.role == roles[role].name)
    console.log(roles[role].name + '; Current: ' + units.length + ', Desired: ');

    if(units.length < roles[role].desired) {
      var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: roles[role].name});
      console.log('Spawning new : ' + roles[role].name + ' ' + newName);
    }
  }



/*  var tower = Game.getObjectById('507f86d4d161584d2c854c19');
  if(tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => structure.hits < structure.hitsMax
    })
    if(closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
      tower.attack(closestHostile);
    }
  }*/

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if(creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }


}