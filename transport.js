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
//creep.memory.role = "R";
  if(creep.carry.energy == creep.carryCapacity){

    // console.log(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY));
    /* if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
         creep.moveTo(Game.spawns.Spawn1);
     } else if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_FULL){
      creep.memory.originalrole = creep.memory.role;
      creep.memory.role = "B";
    }*/
    dropOffResource(creep);

 }else{
     //var target = creep.room.find(FIND_SOURCES);
     //var target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
     //var target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);//, function(drop){return drop.energy > 150});
     //creep.memory.target = Game.spawns.Spawn1.memory.energyStack.id;
     if(creep.memory.target == undefined || Game.getObjectById(creep.memory.target) == null || Game.getObjectById(creep.memory.target).energy< creep.energyCapacity){
       creep.memory.target = Game.spawns.Spawn1.memory.energyStack;
    }
//console.log(Game.getObjectById(creep.memory.target.id));
//console.log(Game.getObjectById(creep.memory.target.id));
    //console.log(_.filter(creep.pos.findInRange(FIND_DROPPED_ENERGY,100), function(drop){return drop.energy > 50})[0]);
   //console.log(creep.moveTo(Game.getObjectById(creep.memory.target)));
 if (creep.pickup( Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE){
              creep.moveTo(Game.getObjectById(creep.memory.target));
  }
 }

}

}
function dropOffResource(creep){

  if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity){ //Full - Look for storage container
//console.log("It's full!");
//console.log(creep.transfer(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType= "STRUCTURE_CONTAINER" && _.sum(x.store) < x.storeCapacity} ), RESOURCE_ENERGY))
if(!creep.memory.dropOffTarget){
  updateDropOffTarget(creep);
}  if(!Game.getObjectById(creep.memory.dropOffTarget)){
  updateDropOffTarget(creep);
}
if( _.sum(Game.getObjectById(creep.memory.dropOffTarget.store) == Game.getObjectById(creep.memory.dropOffTarget.storeCapacity))){
  updateDropOffTarget(creep);
}


    if(creep.transfer(Game.getObjectById(creep.memory.dropOffTarget), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(Game.getObjectById(creep.memory.dropOffTarget));
    } else {
      creep.moveTo(Game.spawns.Spawn1);
    }

  } else { // Spawn not full

    if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(Game.spawns.Spawn1);
    }

  }
}
function updateDropOffTarget(creep){
  creep.memory.dropOffTarget = creep.pos.findClosestByPath(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return (x.structureType == STRUCTURE_EXTENSION && x.energy < x.energyCapacity) || (x.structureType == STRUCTURE_CONTAINER && _.sum(x.store) < x.storeCapacity) } )).id;
}
