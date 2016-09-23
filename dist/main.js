var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


// Unit Role Object
function Unitrole(name, desiredNumber) {
  this.name = name;
  this.desired = desiredNumber;
}


// Roles object
var roles = {
  builder: new Unitrole('builder', 3),
  harvester: new Unitrole('harvester', 6),
  upgrader: new Unitrole('upgrader', 3)
};


/*
 ResourceManager
 */

// get the current Resources
for(var name in Game.rooms) {
  //console.log(name);
  var MeinRoom = Game.rooms[name];
  //console.log(MeinRoom);

  //get sources
  var sources = MeinRoom.find(FIND_SOURCES);
  for(var source in sources) {
    var sauce = sources[source];
    Game.memory.saucy = sauce.lookAtArea(sauce.pos.y-1, sauce.pos.x-1, sauce.pos.y+1, sauce.pos.x+1);
    //source.look()
  }


}


module.exports.loop = function () {

  // Memory Clearing
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  for(var role in roles) {
    var units = _.filter(Game.creeps, (creep) => creep.memory.role == roles[role].name)
    //console.log(roles[role].name + '; Current: ' + units.length + ', Desired: ' + roles[role].desired);

    if(units.length < roles[role].desired) {
      var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: roles[role].name});
      console.log('Spawning new : ' + roles[role].name + ' ' + newName);
    }
  }




  // Get an idea of the resource income

  // Spend the income





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