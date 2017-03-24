module.exports = {
  smartMoveTo: function(creep,target){
    var result = creep.moveTo(target,{noPathFinding: true});
    if(result == ERR_NOT_FOUND){
      return creep.moveTo(target,{reusePath: 20});
    } else return result;

  }
};
