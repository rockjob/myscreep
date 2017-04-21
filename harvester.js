/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('harvester');
* mod.thing == 'a thing'; // true
*/
var creep;
module.exports = {
  run: function(creep){
//console.log("H task");
    if(creep.carry.energy == creep.carryCapacity){
      // console.log(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY));
      if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(Game.spawns.Spawn1);
      }

    }else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'SM'})) < 1){

      //var target = creep.room.find(FIND_SOURCES);
      var target = creep.pos.findClosestByPath(FIND_SOURCES);
      //console.log(creep.room.find(FIND_SOURCES));
      if (creep.harvest(target) == ERR_NOT_IN_RANGE){
        creep.moveTo(target);
      }
    } else {
      //creep.moveTo(Game.spawns.Spawn1);
      if(!creep.pos.isNearTo(Game.flags.Flag1))      creep.moveTo(Game.flags.Flag1);
    }

  }

};
