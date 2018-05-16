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
    soundHelper.helper.playSfx('./assets/sounds/teleportation.wav')
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

function pickItem(id){
  state.set('inventory', id);
  enableMoveButtons();
}

function choice(arg) {
    document.querySelector(".choice-wrapper").classList.remove("hidden")
    document.querySelector(".choice-wrapper__text").innerHTML = arg.text
    const domButtons = document.querySelector(".choice-wrapper__buttons")
    let buttons = ""
    for (let i in arg["choices"]) {
        const button = arg["choices"][i]
        buttons += `<button class="choice-wrapper__button" onclick='execChoice(${JSON.stringify(button)})'>${button.text}</button>`
    }
    domButtons.innerHTML = buttons
}

function readTexts(arg) {
    document.querySelector(".simpleText").classList.remove('hidden')
    const domButton = document.querySelector(".simpleText button")
    domButton.innerHTML = "Next"
    domButton.dataset.arg = JSON.stringify(arg)
    domButton.dataset.index = "0"
    document.querySelector(".simpleText p").innerHTML = arg['text'][0]
    if (arg['text'].length === 1) {
        domButton.innerHTML = "End"
    }
}

window.nextText = function () {
    const domButton = document.querySelector(".simpleText button")
    const index = parseInt(domButton.dataset.index)
    const arg = JSON.parse(domButton.dataset.arg)
    if (arg['text'].length > index + 1) {
        document.querySelector(".simpleText p").innerHTML = arg['text'][index + 1]
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
      itemStore.jumpList[id]();
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

module.exports = {"list": events}
