module.exports = function (type, queued) {

  if(queued == undefined)
      queued = false;

  for(var index in Game.rooms) {
    var room = Game.rooms[index]
  }

  var count = room.find(Game.MY_CREEPS, {
    filter: function(creep) {
      if(creep.memory.role == type)
          return true;
      return false;
    }
  }).length;

  if(queued) {
    var spawns = Game.spawns;

    for(var i in spawns) {
      var spawn = spawns[i];
      if(spawn.spawning !== null
        && spawn.spawning !== undefined
        && Memory.creeps[spawn.spawning.name].role == type) {
        count ++;
      }
    }
    
    count += Memory.spawnQueue.filter(function(queued) {
      return queued == type;
    }).length;
  }

  return count;
};