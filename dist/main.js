var performRoles = require('performRoles');
var spawner = require('spawner');
var countType = require('countType');
var factory = require('factory');

factory.init();
factory.run();

spawner.spawnNextInQueue();

// factory.buildArmyWhileIdle();

performRoles(Game.creeps);
