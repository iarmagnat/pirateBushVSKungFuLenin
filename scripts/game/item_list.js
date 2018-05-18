const skillStore = require("../skills")

const itemList = {
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
        "desc": "This item heals you a small amount at the beginning of each fights",
        "img": "./assets/img/peanuts.png",
        "stats": {
            "hp": {
                "type": "Sum",
                "value": 2,
            }
        },
        "effect": {
            "name": "HEAL DE L'ARACHIDE",
            "trigger": "cbt",
            "callBack": cacahuette_heal,
            "args": {
                "label": "aracheal mastery",
                "skill": "cacahuette_heal",
            },
        }
    }

}

function addSkill(arg) {
    document.querySelector(`#skillBtn-${arg.skill}`).innerHTML = arg.label
    document.querySelector(`#skillBtn-${arg.skill}`).classList.remove("hidden")
}

function cacahuette_heal() {
    const maxHp = state.getMaxHp()
    const events = require("../events")

    if (state.hp < state.getMaxHp()) {
        skillStore.list.tinyHeal(state, state)
        events.readTexts({
            "text": ["Aracheal restore some of your lost hp"],
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

module.exports = itemList