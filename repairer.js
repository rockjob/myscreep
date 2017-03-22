
var creep;
module.exports = {
  run: function(creep){

  if(creep.carry.energy > 0){ //go repair shit
    var target = _.filter(creep.room.find(FIND_STRUCTURES), function(x){return x.hits < x.hitsMax})[0];
//console.log(target);
    if (target != undefined){
      //console.log("TEST");
      if(creep.repair(target) == ERR_NOT_IN_RANGE){
        creep.moveTo(target);
      }
    } else {
      creep.moveTo(Game.flags.Flag1)
    }
  } else {
    goFindResources(creep);
  }

  }
}

    function goFindResources(creep){
      var target = _.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType== STRUCTURE_CONTAINER && x.store[RESOURCE_ENERGY] > 0} )[0];
      if(target != undefined){
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(target);
        }
      }else {
        //go for spawn energy
        var target = _.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType== STRUCTURE_CONTAINER && x.store[RESOURCE_ENERGY] > 0} )[0];
        if(target != undefined){
          if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(target);
          }
        }else
        if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity){
          if(creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(Game.spawns.Spawn1);
          }
        }
      }
    }
