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
            "desc": "With this item you feel the Chuck Norris martial art in your veins",
            "img": "./assets/img/bandana.png",
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
                "name": "Punch !!",
                "trigger": "passive",
                "callBack": addSkill,
                "args": {
                    "label": "Punch !!",
                    "skill": "punch",
                },
            }
        },
        1: {
            "id": 1,
            "name": "brouette",
            "desc": "This item increase your HP and def",
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
                "name": "Brouette-Fu !",
                "trigger": "passive",
                "callBack": addSkill,
                "args": {
                    "label": "Brouette-Fu mastery",
                    "skill": "brouette_fu",
                },
            }
        },
        2: {
            "id": 2,
            "name": "cacahuette",
            "desc": "This item heals you with a amount of 1hp per turn",
            "img": "./assets/img/peanuts.png",
            "stats": {
                "hp": {
                    "type": "Sum",
                    "value": 2,
                }
            },
            "effect": {
                "name": "HEAL DE L'ARACHIDE",
                "trigger": "turn",
                "callBack": cacahuette_heal,
                "args": {
                    "label": "aracheal mastery",
                    "skill": "cacahuette_heal",
                },
            }
        }

    }

    this.addItemInIventory = function (id) {
        const item = this.listItems[id]
        if (item.effect !== undefined) {
            if (item.effect.trigger === "passive") {
                if (item.effect.args !== undefined) {
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

        let el = `<div class="item" onmouseover='getDescItem("${item.name}","${item.desc}")'
                  onmouseout="resetDescItem()">
                <img class="item__image" src="${item.img ? item.img : './assets/img/unknown.png'}">
            </div>`

        document.querySelector(".inventory-content").innerHTML += el


    }
}

function addSkill(arg) {
    document.querySelector(`#skillBtn-${arg.skill}`).innerHTML = arg.label
    document.querySelector(`#skillBtn-${arg.skill}`).classList.remove("hidden")
}

function cacahuette_heal() {
    //debugger;
    let maxHp = state.getMaxHp()
    const events = require("./events")

    if (state.hp < state.getMaxHp()) {
        state.changeHp(1)
        events.readTexts({
            "text": ["Aracheal restore 1 of your lost hp"],
            "event": "",
            "event_args": ""
        })
    } else {
        events.readTexts({
            "text": ["Nothing to heal. Lose hp first !"],
            "event": "",
            "event_args": ""
        })
    }
}

itemStore = new ItemStore()
module.exports = itemStore
