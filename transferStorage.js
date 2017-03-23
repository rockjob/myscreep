/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester');
 * mod.thing == 'a thing'; // true
 */
var creep;
var myTargetStorage;
module.exports = {
run: function(creep){

//console.log("hi");

  if(creep.carry.energy > 0){
    // console.log(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY));
    /* if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
         creep.moveTo(Game.spawns.Spawn1);
     } else if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_FULL){
      creep.memory.originalrole = creep.memory.role;
      creep.memory.role = "B";
    }*/
    dropOffResource(creep);


 }else{

    myTargetStorage =Game.spawns.Spawn1.memory.targetstorage;
     //var target = creep.room.find(FIND_SOURCES);
     //var target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
     var target = creep.pos.findClosestByPath(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType == STRUCTURE_CONTAINER && _.sum(x.store) > 0 && x.id != myTargetStorage} ));
  //  console.log(_.filter(creep.pos.findInRange(FIND_DROPPED_ENERGY,100), function(drop){return drop.energy > 50})[0].energy);
  //  console.log(creep.pickup(target));
  //console.log(target);
 if (creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
              creep.moveTo(target);
  }
 }

}

};
function dropOffResource(creep){
myTargetStorage =Game.spawns.Spawn1.memory.targetstorage;
  if(_.sum(Game.getObjectById(myTargetStorage).store) < Game.getObjectById(myTargetStorage).storeCapacity){
    if(creep.transfer(Game.getObjectById(myTargetStorage), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(Game.getObjectById(myTargetStorage));
    } else {
      creep.moveTo(Game.getObjectById(myTargetStorage));
    }

  }
}
