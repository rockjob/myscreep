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
    if(creep.carry.energy > 0){
      // console.log(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY));
      var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      //console.log(target);
      if(creep.build(target) == ERR_NOT_IN_RANGE){
        creep.moveTo(target);
      }

    }else{ //if empty
      //var target = creep.room.find(FIND_SOURCES);

      if(creep.memory.originalrole == "B"){
        // console.log("test");
        //Look for containers
        var target = _.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType== STRUCTURE_CONTAINER && x.store[RESOURCE_ENERGY] > 300} )[0];
        if(target != undefined){
          if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(target);
          } 
        }else {
          //go for spawn energy
        /*  if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity){
          if(creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(Game.spawns.Spawn1);
        }
      }*/
    }
  } else {
    creep.memory.role = creep.memory.originalrole;
  }

}
}


};
