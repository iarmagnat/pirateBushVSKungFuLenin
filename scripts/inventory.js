function ItemStore() {

    this.turnList = []
    this.jumpList = []
    this.cbtList = []
    this.strSum = 0
    this.strMulti = 1
    this.hpSum = 0
    this.hpMulti = 1
    this.defSum = 0
    this.defMulti = 1


// type stats : Sum  / Multi
// event trigger : jump / cbt / turn / passive
    this.listItems = {
        0: {
            "id": 0,
            "name": "bandana",
            "img": "",
            "stats": {
                "str": {
                    "type": "Sum",
                    "value": 5,
                },
                "def": {
                    "type": "Sum",
                    "value": 5,
                },
                "hp": {
                    "type": "Sum",
                    "value": 10,
                }
            },
            "effect": {
                "name": "Punch",
                "trigger": "passive",
                "callBack": addSkill,
                "args": 0,
            }
        },
        1: {
            "id": 1,
            "name": "brouette",
            "img": "./assets/img/brouette.png",
            "stats": {
                "def": {
                    "type": "Sum",
                    "value": 5,
                },
                "hp": {
                    "type": "Sum",
                    "value": 5,
                }
            },
            "effect": {
                "trigger": "passive",
                "args": 0,
            }
        }

    }

    this.addItemInIventory = function (id) {
        const item = this.listItems[id]
        if (item.effect !== undefined) {
            if (item.effect.trigger === "passive") {
                if (item.effect.args !== undefined && item.effect.callback !== undefined) {
                    item.effect.callBack(item.effect.args)
                } else if (item.effect.callback !== undefined) {
                    item.effect.callBack()
                }

            } else {
                this[item.effect.trigger + "List"].push(item.effect.callBack)
            }
        }

        for (let key in item.stats) {
            //ex : str + Sum += la valeur de l'objet
            let old = false
            if (key === "hp") {
                old = this.hpSum * this.hpMulti
            }
            this[key + item.stats[key].type] += item.stats[key].value

            try {
                if (old !== false) {
                    if (this.hpSum * this.hpMulti > old) {
                        // state.hp += this.hpSum * this.hpMulti - old
                        state.changeHp(this.hpSum * this.hpMulti - old)
                    } else if (state.hp > this.hpSum * this.hpMulti) {
                        state.set("hp", this.hpSum * this.hpMulti)
                    }
                    if (state.hp < 0) {
                        state.set("hp", 1)
                    }
                }
            } catch (ReferenceError) {
            }

        }

        let el = `<div class ="item">
                <img class="item__image" src="${item.img ? item.img : './assets/img/unknown.png'}">
            </div>`

        document.querySelector(".inventory-content").innerHTML += el


    }
}

function addSkill(id) {
    console.log("add skill", id)
}

itemStore = new ItemStore()
module.exports = itemStore
