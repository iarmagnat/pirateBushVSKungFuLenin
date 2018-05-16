const soundHelper = require("./helpers/soundHelper.js")
const map = require("./map.js")
const itemStore = require('./inventory.js')

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
}

function enableMoveButtons(arg) {
    document.querySelectorAll(".interact__directions button").forEach(function (elmts) {
        elmts.disabled = false
    })
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
    //document.querySelector(".simpleText p").innerHTML = arg['text'][0]
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

}

window.typeText = function (text, target) {
    target.innerHTML = ""
    document.querySelectorAll(".main button").forEach(function (elmt) {
        elmt.disabled = true
    })
    let typeInter = setInterval(function () {

        if (text.slice(0, 1) === "<") {
            target.innerHTML += "<br/>"
            text = text.slice(4
            )
        } else {
            target.innerHTML += text.slice(0, 1)
            text = text.slice(1)
        }
        soundHelper.playSfx('./assets/sounds/fight.wav')

        if (text.length == 0) {
            clearInterval(typeInter)
            document.querySelectorAll(".main button").forEach(function (elmt) {
                elmt.disabled = false
            })
            soundHelper.killSfx()
        }
    }, 50)
}

module.exports = {"list": events}
