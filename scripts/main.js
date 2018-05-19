const events = require("./events")
const stateLib = require("./state.js")
const map = require("./map.js")
const skillStore = require("./skills")


// initialize play area
window.directions = ["n", "s", "e", "w"]

window.arrive = function (id) {
    events["arrive"](id)
}

skillStore.createSkillButtons()

if (stateLib.ls.getState()) {
    state = new stateLib.State(stateLib.ls.getState())
} else {
    state = new stateLib.State({
        "name": "you",
        "position": 0,
        "inventory": [],
        "hp": 0,
        "visited": [],
        "fight": false,
    })
}


//game start
map.initMap()
events["arrive"](state.position)
