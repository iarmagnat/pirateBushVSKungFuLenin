const events = require("./events")
const stateLib = require("./state.js")
const map = require("./map.js")


// initialize play area
window.directions = ["n", "s", "e", "w"]

window.arrive = function (id) {
    events["arrive"](id)
}

if (stateLib.ls.getState()) {
    state = new stateLib.State(stateLib.ls.getState())
} else {
    state = new stateLib.State({
        "name": "you",
        "position": 0,
        "inventory": [],
        "hp": 0,
        "visited": [0],
        "fight": false,
    })
}


//game start
map.object.initMap()
events["arrive"](state.position)
