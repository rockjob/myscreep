//https://screeps.com/a/#!/sim/tutorial/1
var harvester = require('harvester');
var sMiner = require('sMiner');
var transport = require('transport');
var builder = require('builder');
var upgrader = require('upgrader');
var returner = require('returner');
var extensionFiller = require('extensionFiller');
var repairer = require('repairer');
var rangeHarvester = require('rangeHarvester');
var spawnerScript = require('spawnerScript');
var transferStorage = require('transferStorage');
var loopcount=0;

module.exports.loop = function () {
loopcount++;
//console.log(loopcount);
if(loopcount%10 == 0){
  Game.spawns.Spawn1.memory.targetstorage = Game.spawns.Spawn1.room.controller.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(x){return x.structureType== STRUCTURE_CONTAINER}});
//  console.log("udpated");
  loopcount=0;
}
  //console.log("loop");
  //spawnerScript.run([MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK],{ originalrole: "SM", role:"SM"} );
  if(Game.spawns.Spawn1.memory.targetstorage == undefined){
    Game.spawns.Spawn1.memory.targetstorage = Game.spawns.Spawn1.room.controller.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(x){return x.structureType== STRUCTURE_CONTAINER}});
  }
  var temp = Game.spawns.Spawn1.room.find(FIND_DROPPED_ENERGY).sort(function(a,b){if(a.energy < b.energy)return 1; else return -1;})[0];
  if(temp){
    Game.spawns.Spawn1.memory.energyStack = temp.id;
  }

  for(var name in Game.creeps) {
    // console.log(name);
    var creep = Game.creeps[name];
    if(!creep) delete Memory.creeps[creep];
    //creep.moveTo(Game.spawns.Spawn1);
    if (creep.memory.role == "H") harvester.run(creep);
    if (creep.memory.role == "SM") sMiner.run(creep);
    if (creep.memory.role == "T") transport.run(creep);
    if (creep.memory.role == "B") builder.run(creep);
    if (creep.memory.role == "U") upgrader.run(creep);
    if (creep.memory.role == "R") returner.run(creep);
    if (creep.memory.role == "EF") extensionFiller.run(creep);
    if (creep.memory.role == "RE") repairer.run(creep);
    if (creep.memory.role == "RH") rangeHarvester.run(creep);
    if (creep.memory.role == "TS") transferStorage.run(creep);
    //console.log(creep.carryCapacity);



  }
  if(_.size(Game.creeps) < 5){
  if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'H'})) < 4){
    Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],null, { originalrole: "H", role: "H" } );
  } else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'EF'})) < 1){
    Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "EF", role: "EF"} );
  }
}
  if(_.size(Game.creeps) < 25 && Game.spawns.Spawn1.room.energyAvailable == Game.spawns.Spawn1.room.energyCapacityAvailable){
    //Spawn creeps if low


    if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'H'})) < 1){
      Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],null, { originalrole: "H", role: "H" } );
    } else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'SM'})) < 3){
      //console.log("creeps low");
      spawnerScript.run([MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK],{ originalrole: "SM", role:"SM"} );
      //Game.spawns.Spawn1.createCreep([WORK,WORK,MOVE],null, { originalrole: "SM", role:"SM"} );
    } else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'T'})) < 2){
      spawnerScript.run([MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],{ originalrole: "T", role:"T"} );
    } else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'TS'})) < 1){
      spawnerScript.run([MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],{ originalrole: "TS", role:"TS"} );
      //  Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE],null, { originalrole: "T", role:"T"} );
    } else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'U'})) < 10){
      spawnerScript.run([MOVE,CARRY,WORK,WORK,WORK,CARRY,MOVE,WORK],{ originalrole: "U", role:"U"});
      //Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE,MOVE],null, { originalrole: "U", role:"U"} );
    }  else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'B'})) < 2){
      //Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "B", role: "B"} );
      spawnerScript.run([CARRY,WORK,MOVE,CARRY,WORK,MOVE,CARRY,WORK,MOVE,CARRY,WORK,MOVE],{ originalrole: "B", role:"B"});
    } else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'EF'})) < 1){
      Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "EF", role: "EF"} );
    }else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'RE'})) < 1){
      Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE],null, { originalrole: "RE", role: "RE"} );
    }else if(_.size(_.filter(Game.creeps, function(creep){return creep.memory.originalrole == 'RH'})) < 0){
      Game.spawns.Spawn1.createCreep([CARRY,CARRY,WORK,WORK,MOVE,MOVE],null, {role : "RH"});
    }
  }
  for(var name in Memory.creeps){
    if(!Game.creeps[name]){
      delete Memory.creeps[name];
    }
  }



  // if(_.size(Game.creeps) <2){

  //console.log(_.filter(Game.creeps, function(creep){return creep.memory.role == 'H'}));
  //   Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],null, { role: "H"} );
  //}


}
