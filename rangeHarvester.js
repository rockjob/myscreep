var creep;
module.exports = {

	run: function(creep){

 if(creep.memory.init == undefined){

	 initialise(creep);
 }

	if(creep.carry.energy < creep.carryCapacity) {

			if(creep.room.name == creep.memory.targetMap){

				var sources = creep.room.find(FIND_SOURCES);
				if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0]);
				}
			} else {

				creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.targetMap)));
			}

			}
			else {
				dropOffResource(creep);
			}
	}
}

function dropOffResource(creep){
  if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity){ //Full - Look for storage container
//console.log("It's full!");
//console.log(creep.transfer(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType= "STRUCTURE_CONTAINER" && _.sum(x.store) < x.storeCapacity} ), RESOURCE_ENERGY))
    if(creep.transfer(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType= "STRUCTURE_CONTAINER" && _.sum(x.store) < x.storeCapacity} )[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return x.structureType= "STRUCTURE_CONTAINER" && _.sum(x.store) < x.storeCapacity} )[0]);
    } else {
      creep.moveTo(Game.spawns.Spawn1);
    }

  } else { // Spawn not full

    if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(Game.spawns.Spawn1);
    }

  }
}

function initialise(creep){

creep.memory.role = "RH";
creep.memory.originalrole = "RH";
creep.memory.targetMap = "W7N7";
creep.memory.init = "T";
}
