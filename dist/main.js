// Hello Game!

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }



  function Role(name, desiredNumber) {
    this.name = name;
    this.desiredNumber = desiredNumber;
  }

  var roles = {};
  roles.builder = new Role('builder', 1);
  roles.Hhrvester = new Role('harvester', 1);
  roles.upgrader = new Role('upgrader', 1);
  //Game.creeps.roles = roles;



  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
  console.log('Harvesters: ' + harvesters.length);

  if(harvesters.length < 1) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
    console.log('Spawning new harvester: ' + newName);
  }

  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
  console.log('Builders: ' + builders.length);

  if(builders.length < 1) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
    console.log('Spawning new Builder: ' + newName);
  }

  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
  console.log('Upgraders: ' + upgraders.length);

  if(upgraders.length < 1) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
    console.log('Spawning new Upgrader: ' + newName);
  }


  var tower = Game.getObjectById('507f86d4d161584d2c854c19');
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
  }

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