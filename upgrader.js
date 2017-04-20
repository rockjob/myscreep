/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('harvester');
* mod.thing == 'a thing'; // true
*/

var moveScripts = require('moveScripts');
var creep;
module.exports = {
  run: function(creep){

    //creep.memory.role = "R";
    //console.log(creep.room.controller);

    if(creep.carry.energy > 0){
      // console.log(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY));
      //  var target = creep.room.contoller;
      //console.log(creep.upgradeController(creep.room.contoller));
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){

        //creep.moveTo(creep.room.controller);
        moveScripts.smartMoveTo(creep,creep.room.controller);
      }

    }else{
      //var target = creep.room.find(FIND_SOURCES);
      //Look for containers

      if(creep.memory.target){
        //check if still exists
        //check if has enough resources
        if(!Game.getObjectById(creep.memory.target)){
          updateTarget(creep);
        } else if((Game.getObjectById(creep.memory.target).store[RESOURCE_ENERGY] < creep.carryCapacity) || (Game.spawns.Spawn1.memory.targetstorage != creep.memory.target)){
          updateTarget(creep);
          //creep.moveTo(creep.room.controller);
            moveScripts.smartMoveTo(creep,creep.room.controller);
        } else if(creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          //creep.moveTo(Game.getObjectById(creep.memory.target));
          moveScripts.smartMoveTo(creep,Game.getObjectById(creep.memory.target));
        }
      }else {
        updateTarget(creep);

        `if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity){
          if(creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(Game.spawns.Spawn1);
          }
        }          else {
          creep.moveTo(Game.flags.Flag1);
        }`
        //creep.moveTo(Game.flags.Flag1);
        moveScripts.smartMoveTo(creep,Game.flags.Flag1);
      }




    }
  }
}
function updateTarget(creep){
  //var target = creep.pos.findClosestByPath(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType== STRUCTURE_CONTAINER && x.store[RESOURCE_ENERGY] >  creep.carryCapacity} ));

  if(Game.spawns.Spawn1.memory.targetstorage){
  creep.memory.target = Game.spawns.Spawn1.memory.targetstorage;
} else {
  var target = creep.pos.findClosestByPath(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType== STRUCTURE_CONTAINER && x.store[RESOURCE_ENERGY] >  creep.carryCapacity} ));
  if(target){
    creep.memory.target = target.id;
  }
}
}
