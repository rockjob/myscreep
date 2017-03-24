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
var moveScripts = require('moveScripts');
var loopcount=0;
var roomList = [Game.spawns.Spawn1.room.name,null];

module.exports.loop = function () {
  loopcount++;
  //console.log(loopcount);
  if(loopcount%10 == 0){
    if(!Memory.roomList){
      Memory.roomList = roomList;
    }
    var tmp = Game.spawns.Spawn1.room.controller.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(x){return x.structureType== STRUCTURE_CONTAINER}});

    if(tmp) Game.spawns.Spawn1.memory.targetstorage = tmp.id;

    if(!Memory.creepConfiguration) creepConfiguration();
    //console.log("udpated");
    loopcount=0;
  }
  //console.log("loop");
  //spawnerScript.run([MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK],{ originalrole: "SM", role:"SM"} );
  if(Game.spawns.Spawn1.memory.targetstorage == undefined){
    Game.spawns.Spawn1.memory.targetstorage = Game.spawns.Spawn1.room.controller.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(x){return x.structureType== STRUCTURE_CONTAINER}}).id;
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
  //console.log("test");
  spawnerScript.spawnTick();
  for(var name in Memory.creeps){
    if(!Game.creeps[name]){
      delete Memory.creeps[name];
    }
  }



  // if(_.size(Game.creeps) <2){

  //console.log(_.filter(Game.creeps, function(creep){return creep.memory.role == 'H'}));
  //   Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],null, { role: "H"} );
  //}


} // End of main loop

function creepConfiguration(){
  //Memory.creepConfiguration = null;
  var creepConfiguration = [];// = Memory.creepConfiguration;
  creepConfiguration[0] = [];
  creepConfiguration[1] = [];

  creepConfiguration[0][0]=['H',4,[WORK,CARRY,MOVE],3];
  creepConfiguration[0][1]=['EF',1,[CARRY,WORK,MOVE],3];
  creepConfiguration[0][2]=['T',3,[MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],3];
  creepConfiguration[0][3]=['SM',3,[MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK],3];
  creepConfiguration[0][4]=['TS',3,[MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],3];
  creepConfiguration[0][5]=['U',0,[CARRY,WORK,MOVE,MOVE],3];
  creepConfiguration[0][6]=['B',2,[CARRY,WORK,MOVE],3];
  creepConfiguration[0][7]=['RE',1,[CARRY,WORK,MOVE],3];
  creepConfiguration[0][8]=['RH',0,[CARRY,CARRY,WORK,WORK,MOVE,MOVE],3];

  //creepConfiguration[1][0]=['SM',2];
  //creepConfiguration[1][1]=['T',5];



  //creepConfiguration[0]['H']=[4]
  //console.log(creepConfiguration[0]['H']);
  Memory.creepConfiguration = creepConfiguration;
}
