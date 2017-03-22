module.exports = {

	run: function(creep){
creep.moveTo(Game.spawns.Spawn1);
Game.spawns.Spawn1.recycleCreep(creep);
  }

};
