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
 }

};
