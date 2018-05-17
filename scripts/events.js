const soundHelper = require("./helpers/soundHelper.js")
const map = require("./map.js")
const itemStore = require('./inventory.js')
const fightHelper = require('./fight.js')

const events = {
    "end": enableMoveButtons,
    "log": log,
    "choice": choice,
    "readTexts": readTexts,
    "teleportation": teleportation,
    "arrive": arrive,
    "teleportationChoice": teleportationChoice,
    "pickItem": pickItem,
    "uRdead": uRdead,
    "fight": fight,
    "continueFight": continueFight,
    "concludeFight": concludeFight,
    "reset": reset,
}

function reset() {
    state.clearState()
    location.reload(true)
}

function enableMoveButtons(arg) {
    document.querySelectorAll(".interact__directions button").forEach(function (elmts) {
        elmts.disabled = false
    })
}

function continueFight() {
    //checking death condition should not be necessary as it it supposed to be handeled by the changeHp methods
    if (state.fight.humanTurn) {
        document.querySelectorAll(".combat-buttons button").forEach(function (elmts) {
            elmts.disabled = false
        })
    } else {
        state.fight.attack(state.fight.enemy.skill, state.fight.enemy, state)
    }
}

function concludeFight(arg) {
    if (arg.dead === "enemy") {
        document.querySelector(".combat-block").classList.add("hidden")
        document.querySelector(".combat-buttons").classList.add("hidden")
        soundHelper.playSfx('./assets/sounds/shittyDeathSound.wav')
        events.readTexts({
            "text": [`${capitalizeFirstLetter(arg.name)} is dead! Long live kung-fu Lenin!`],
            "event": arg.event,
            "event_args": arg.event_args,
        })
    } else {
        events.readTexts({
            "text": ["Game over! Better luck next time!"],
            "event": "reset",
            "event_args": "",
        })
    }
}

function log(arg) {
    console.log(arg)
    enableMoveButtons()
}

window.execChoice = function (event) {
    document.querySelector(".choice-wrapper").classList.add("hidden")
    events[event["event"]](event["event_args"])
}

function teleportation(arg) {
    map.object.goTo(arg)
    soundHelper.playSfx('./assets/sounds/teleportation.wav')
}

function teleportationChoice(arg) {
    events["choice"]({
        "text": "You are in front of a teleporter, what do you do?",
        "choices": [
            {
                "text": "Jump in!",
                "event": "teleportation",
                "event_args": arg
            },
            {
                "text": "Stay here",
                "event": "end",
                "event_args": "",
            }
        ],
    })
}

function pickItem(args) {
    state.set('inventory', args.id)
    events[args.event](args.event_args)
}

function uRdead() {
    document.querySelector("body").innerHTML = "<img src='./assets/img/brouette.png' style='max-width:100%;max-height:100%;'>"
}

function choice(arg) {
    document.querySelector(".choice-wrapper").classList.remove("hidden")
    //document.querySelector(".choice-wrapper__text").innerHTML = arg.text

    const domButtons = document.querySelector(".choice-wrapper__buttons")
    let buttons = ""
    for (let i in arg["choices"]) {
        const button = arg["choices"][i]
        buttons += `<button class="choice-wrapper__button" onclick='execChoice(${JSON.stringify(button)})'>${button.text}</button>`
    }
    domButtons.innerHTML = buttons
    window.typeText(arg.text, document.querySelector(".choice-wrapper__text"))
}

function readTexts(arg) {
    document.querySelector(".simpleText").classList.remove('hidden')
    const domButton = document.querySelector(".simpleText button")
    domButton.innerHTML = "Next"
    domButton.dataset.arg = JSON.stringify(arg)
    domButton.dataset.index = "0"
    window.typeText(arg['text'][0], document.querySelector(".simpleText p"))

    if (arg['text'].length === 1) {
        domButton.innerHTML = "End"
    }
}

window.nextText = function () {
    const domButton = document.querySelector(".simpleText button")
    const index = parseInt(domButton.dataset.index)
    const arg = JSON.parse(domButton.dataset.arg)
    if (arg['text'].length > index + 1) {
        //document.querySelector(".simpleText p").innerHTML = arg['text'][index + 1]
        window.typeText(arg['text'][index + 1], document.querySelector(".simpleText p"))
        domButton.dataset.index = String(index + 1)
        if (arg['text'].length === index + 2) {
            domButton.innerHTML = "End"
        }
    } else {
        document.querySelector(".simpleText").classList.add('hidden')
        events[arg["event"]](arg["event_args"])
    }
}

function arrive(id) {
    for (let id in itemStore.jumpList) {
        itemStore.jumpList[id]()
    }
    const node = map.object.node_list[id]
    if (node["bg"]) {
        //debugger
        document.querySelector(".main").style.backgroundImage = "url('" + node["bg"] + "')"
    } else {
        document.querySelector(".main").style.backgroundImage = "url('./assets/img/bkgd-top.png')"
    }
    if (node['bgm']) {
        soundHelper.setBgm(node['bgm'])
    }else {
        soundHelper.setBgm('./assets/sounds/mainBgm.wav')
    }

    let visited = false
    if (node.once && state.visited.includes(node.id)) {
        visited = true
    }

    // Change state
    state.set("position", id)
    // Update map and screen
    map.object.updateMap()
    if (visited) {
        events[node.then](node.then_args)
    } else {
        events[node.event](node.event_args)
    }
}

function fight(arg) {
    soundHelper.playSfx("./assets/sounds/fight.wav")
    if (!map.object.node_list[self.state.position]['bgm']) {
      //soundHelper.setBgm('./assets/sounds/orchestra.wav')
      console.log("ent");
    }
    //re-enable combat buttons in case it is needed
    document.querySelectorAll(".combat-buttons button").forEach(function (elmts) {
        elmts.disabled = false
    })

    state.fight = fightHelper.start(arg.id, arg.event, arg.event_args)
    document.querySelector(".combat-buttons").classList.remove("hidden")
    document.querySelector(".combat-block").classList.remove("hidden")
}



window.typeText = function (text, target) {
    target.innerHTML = ""
    document.querySelectorAll(".main button").forEach(function (elmt) {
        elmt.disabled = true
    })
    let typeInter = setInterval(function () {

        if (text.slice(0, 1) === "<") {
            target.innerHTML += "<br/>"
            text = text.slice(4)
        } else {
            target.innerHTML += text.slice(0, 1)
            text = text.slice(1)
        }
        soundHelper.playSfxText()

        if (text.length === 0) {
            target.innerHTML += "<br><br>"
            clearInterval(typeInter)
            document.querySelectorAll(".main button").forEach(function (elmt) {
                elmt.disabled = false
            })
            soundHelper.killSfxText()
        }
    }, 50)
}

window.attack = function(skill) {
    state.fight.attack(skill, state, state.fight.enemy)
    document.querySelectorAll(".combat-buttons button").forEach(function (elmts) {
        elmts.disabled = true
    })
}

module.exports = events
