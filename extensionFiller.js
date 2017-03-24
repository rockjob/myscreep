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
    if(creep.carry.energy > 0){

      var target = creep.pos.findClosestByPath(_.filter(Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES),function(x){return ((x.structureType== STRUCTURE_EXTENSION ) && x.energy < x.energyCapacity)} ));
      //console.log(target);
      if(target){
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(target);
        } else {
          //creep.moveTo(Game.spawns.Spawn1);
        }
      }
    }else{ //if empty
      //var target = creep.room.find(FIND_SOURCES);

      if(creep.memory.originalrole == "EF"){
        //console.log("test");
        /*if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity){
        if(creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(Game.spawns.Spawn1);
      }
    }*/
    var target = creep.pos.findClosestByPath(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType== STRUCTURE_CONTAINER && x.store[RESOURCE_ENERGY] > 0} ));
    if(target){
      if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(target);
      }
    } else{
        if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity){
          if(creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(Game.spawns.Spawn1);
          }
        }
      } //else {
        /*if(creep.pickup(creep.pos.findClosestByPath(creep.room.find(FIND_DROPPED_ENERGY)))== ERR_NOT_IN_RANGE){
        creep.moveTo(creep.pos.findClosestByPath(creep.room.find(FIND_DROPPED_ENERGY)));
      }*/
  //  }
  } else {
    creep.memory.role = creep.memory.originalrole;
  }

}
}
}
