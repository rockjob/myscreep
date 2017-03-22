var creepType;
module.exports = {

	run: function(body,data){
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
}
