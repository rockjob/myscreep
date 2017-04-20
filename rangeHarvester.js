var creep;
var moveScripts = require('moveScripts');

module.exports = {

	run: function(creep){
//console.log("RH creep name: " + creep.name);
		if(creep.memory.init == undefined){

			initialise(creep);
		}

		if(creep.carry.energy < creep.carryCapacity) {

			if(creep.room.name == creep.memory.targetMap){
				var target =  Game.getObjectById(creep.memory.target);
				//console.log(target);
				if(creep.memory.target == undefined|| target == null ){
					//creep.memory.target = _.filter(creep.room.find(FIND_SOURCES), function(x){return x.energy > 0 })[0].id;
					if(creep.pos.findClosestByPath(_.filter(creep.room.find(FIND_SOURCES), function(x){return x.energy > 0 }))){
						creep.memory.target = creep.pos.findClosestByPath(_.filter(creep.room.find(FIND_SOURCES), function(x){return x.energy > 0 })).id;
					} else return 0;
				}

				if (creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE){
					//if(creep.moveTo(Game.getObjectById(creep.memory.target)) == ERR_NO_PATH){
					if(moveScripts.smartMoveTo(creep,Game.getObjectById(creep.memory.target)) == ERR_NO_PATH){
						creep.memory.target = undefined;
					}
				}
			} else { //Not in target room
				//console.log ("movement target " + creep.memory.target.id);
				//test
				//console.log(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.targetMap)));
				if(creep.memory.target && creep.memory.target.room == creep.room.name){
					var result = moveScripts.smartMoveTo(creep,creep.memory.target);
					//console.log(result + " " + creep.name + " target " + creep.memory.target.x + creep.memory.target.y);
					if(result == ERR_NO_PATH || result == ERR_INVALID_TARGET) {
						creep.memory.target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.targetMap));
						//console.log("RH target updated for " + creep.name + " new target " + creep.memory.target);
					}
					if(result == ERR_NO_BODYPART) creep.memory.role = 'R';
				} else{
					creep.memory.target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.targetMap));
					//console.log(Game.rooms);
					//console.log (creep.memory.targetMap);
					//creep.memory.target = _.filter(Game.rooms[creep.memory.targetMap].find(FIND_SOURCES), function(x){return x.energy > 0 })[0].id;

					//moveScripts.smartMoveTo(creep,Game.getObjectById(creep.memory.target));
					var result = moveScripts.smartMoveTo(creep,creep.memory.target);
					//if(result == ERR_NO_BODYPART) creep.memory.role = 'R';
				}
				//creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.targetMap)));
			}

		}
		else if(creep.room.name == creep.memory.homeMap) {

			dropOffResource(creep);
		} else {
			if(creep.memory.target){
				var result = moveScripts.smartMoveTo(creep,creep.memory.target);
				if(result == ERR_NO_PATH || result ==ERR_INVALID_TARGET) creep.memory.target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.homeMap));
			} else{
				creep.memory.target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.homeMap));
				moveScripts.smartMoveTo(creep,creep.memory.target);
			}

			//moveScripts.smartMoveTo(creep,creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.homeMap)));
			//creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.homeMap)));
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
		} else if( _.sum(Game.getObjectById(creep.memory.dropOffTarget).store) == Game.getObjectById(creep.memory.dropOffTarget.storeCapacity)){
			console.log("its full");
			updateDropOffTarget(creep);
		}


		if(creep.transfer(Game.getObjectById(creep.memory.dropOffTarget), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
			//creep.moveTo(Game.getObjectById(creep.memory.dropOffTarget));
			moveScripts.smartMoveTo(creep,Game.getObjectById(creep.memory.dropOffTarget));
		} else {
			moveScripts.smartMoveTo(creep,Game.spawns.Spawn1);
			//creep.moveTo(Game.spawns.Spawn1);
		}

	} else { // Spawn not full

		if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
			moveScripts.smartMoveTo(creep,Game.spawns.Spawn1);
			//creep.moveTo(Game.spawns.Spawn1);
		}

	}
}
function updateDropOffTarget(creep){
	var newtarget = creep.pos.findClosestByPath(_.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES),function(x){return (x.structureType == STRUCTURE_EXTENSION && x.energy < x.energyCapacity) || (x.structureType == STRUCTURE_CONTAINER && _.sum(x.store) < x.storeCapacity) } ));
	if(newtarget)creep.memory.dropOffTarget = newtarget.id;
}

function initialise(creep){

	creep.memory.role = "RH";
	creep.memory.originalrole = "RH";
	//console.log(Memory.roomList);
	creep.memory.targetMap = Memory.roomList[1];
	creep.memory.homeMap = Memory.roomList[0];
	creep.memory.init = "T";
}
