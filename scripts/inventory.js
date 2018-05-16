function ItemStore (){

  this.turnList = [];
  this.jumpList = [];
  this.cbtList = [];
  this.strSum = 0;
  this.strMulti = 1;
  this.hpSum = 0;
  this.hpMulti = 1;
  this.defSum = 0;
  this.defMulti = 1


// type stats : Sum  / Multi
//event trigger : jump / cbt / turn / passive
this.listItems = {
    0: {
      "id": 0,
      "name": "brouette",
      "img": "",
      "stats": {
        "str": {
          "type": "Sum",
          "value": 4,
        }
      },
      "effect":{
        "name": "kun brouettalurgie fu",
        "trigger": "jump",
        "callBack": brouette,
      }
    }
  }

  this.addItemInIventory = function(id){
    const item = this.listItems[id]

    if (item.effect.trigger === "passive") {
      item.effect.callBack();
    }else {

      this[item.effect.trigger + "List"].push(item.effect.callBack);
    }

    for (var key in item.stats) {
      //ex : str + Sum += la aleur de l objet
        this[key + item.stats[key].type] += item.stats[key].value;
    }
//met la vignette ou qui faut
  }
}

function brouette(){
  console.log('brouettance');
}

itemStore = new ItemStore()
module.exports = itemStore;
