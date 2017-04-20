module.exports = {
  smartMoveTo: function(creep,target){
    if(target.x != undefined){
      //console.log("x, y : " + target.x + target.y);
        return creep.moveTo(target.x,target.y);
    } else {

      var result = creep.moveTo(target,{noPathFinding: true});
      if(result == ERR_NOT_FOUND){
        return creep.moveTo(target,{reusePath: 20});
      } else return result;

    }
  }
};
