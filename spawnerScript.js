var creepType;
module.exports = {



	spawnTick: function(){ //function to assess creep requirements of room and creep spawn order
		if(Memory.roomList){
			spawnRoom(Memory.roomList[0]);
		}
	}



}

function buildCreep(body,data){
	//console.log("Running spawner");
	var bodytemp = new Array();
	for(i=1; i< body.length; i++){
//console.log(i);
		//console.log(bodytemp);
		//console.log(Game.spawns.Spawn1.canCreateCreep(_.union(bodytemp,body[count])));
		//var result = Game.spawns.Spawn1.canCreateCreep(_.union(bodytemp,body[count])));
		if(Game.spawns.Spawn1.canCreateCreep(_.take(body,i))==0){
			//console.log(_.take(body,i) + " =success");
			//bodytemp = _.union(bodytemp , body[count]);
			bodytemp = _.take(body,i);
		} else{
			//console.log(_.take(body,i) + " =fail");
			break;
		}
	}
//console.log(count);
//console.log(bodytemp);
	Game.spawns.Spawn1.createCreep(bodytemp,null, data);

}

function spawnRoom(room){
	if(Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity) return 0;
	if(_.size(Game.creeps) < 5 ){
	if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'H'})) < 4){
		Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],null, { originalrole: "H", role: "H" } );
	}
}
if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'EF'})) < 1){
	Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "EF", role: "EF"} );
}
	if(_.size(Game.creeps) < 35 ){
		//Spawn creeps if low


		if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'H'})) < 1){
			Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],null, { originalrole: "H", role: "H" } );
		} else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'EF'})) < 1){
			Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "EF", role: "EF"} );
		} else if((_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'SM'})) < 3 && (Game.spawns.Spawn1.room.energyAvailable == Game.spawns.Spawn1.room.energyCapacityAvailable))|| _.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'SM'})) == 0 ){
			//console.log("creeps low");
			buildCreep([MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK],{ originalrole: "SM", role:"SM"} );
			//Game.spawns.Spawn1.createCreep([WORK,WORK,MOVE],null, { originalrole: "SM", role:"SM"} );
		} else if((_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'T'})) < 4 && (Game.spawns.Spawn1.room.energyAvailable == Game.spawns.Spawn1.room.energyCapacityAvailable)) || _.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'T'}))  < 2 ){
			buildCreep([MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],{ originalrole: "T", role:"T"} );
		} else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'TS'})) < 3&& Game.spawns.Spawn1.room.energyAvailable == Game.spawns.Spawn1.room.energyCapacityAvailable){
			buildCreep([MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],{ originalrole: "TS", role:"TS"} );
			//  Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE],null, { originalrole: "T", role:"T"} );
		} else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'U'})) < 10&& Game.spawns.Spawn1.room.energyAvailable == Game.spawns.Spawn1.room.energyCapacityAvailable){
			buildCreep([MOVE,CARRY,WORK,WORK,WORK,CARRY,MOVE,WORK],{ originalrole: "U", role:"U"});
			//Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE,MOVE],null, { originalrole: "U", role:"U"} );
		}  else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'B'})) < 2){
			//Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "B", role: "B"} );
			buildCreep([CARRY,WORK,MOVE,CARRY,WORK,MOVE,CARRY,WORK,MOVE,CARRY,WORK,MOVE],{ originalrole: "B", role:"B"});
		} else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'EF'})) < 1){
			Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "EF", role: "EF"} );
		}else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'RE'})) < 1){
			Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "RE", role: "RE"} );
		}else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'RH'})) < 5){
			//Game.spawns.Spawn1.createCreep([CARRY,CARRY,WORK,WORK,MOVE,MOVE],null, {role : "RH"});
			Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, {role : "RH"});
		}
	}
}
