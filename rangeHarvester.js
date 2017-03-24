var creep;
var moveScripts = require('moveScripts');

module.exports = {

	run: function(creep){

		if(creep.memory.init == undefined){

			initialise(creep);
		}

		if(creep.carry.energy < creep.carryCapacity) {

			if(creep.room.name == creep.memory.targetMap){

				if(creep.memory.target == undefined|| Game.getObjectById(creep.memory.target).energy == 0){
					//creep.memory.target = _.filter(creep.room.find(FIND_SOURCES), function(x){return x.energy > 0 })[0].id;
					if(creep.pos.findClosestByPath(_.filter(creep.room.find(FIND_SOURCES), function(x){return x.energy > 0 }))){
						creep.memory.target = creep.pos.findClosestByPath(_.filter(creep.room.find(FIND_SOURCES), function(x){return x.energy > 0 })).id;
					} else return 0;
				}

				if (creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE){
					if(creep.moveTo(Game.getObjectById(creep.memory.target)) == ERR_NO_PATH){
						creep.memory.target = undefined;
					}
				}
			} else {
				//test
				//moveScripts.smartMoveTo(creep,creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.targetMap)));
				creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.targetMap)));
			}

		}
		else if(creep.room.name == creep.memory.homeMap) {

			dropOffResource(creep);
		} else {
			//moveScripts.smartMoveTo(creep,creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.homeMap)));
			creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.homeMap)));
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
		if( _.sum(Game.getObjectById(creep.memory.dropOffTarget).store) == Game.getObjectById(creep.memory.dropOffTarget.storeCapacity)){
			console.log("its full");
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

function initialise(creep){

	creep.memory.role = "RH";
	creep.memory.originalrole = "RH";
	//console.log(Memory.roomList);
	creep.memory.targetMap = Memory.roomList[1];
	creep.memory.homeMap = Memory.roomList[0];
	creep.memory.init = "T";
}
