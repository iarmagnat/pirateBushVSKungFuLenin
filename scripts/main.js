require("./events")
const stateLib = require("./state.js")
require("./map.js")


// initialize play area
window.directions = ["n", "s", "e", "w"]

if (stateLib.ls.getState()) {
    state = new stateLib.State(stateLib.ls.getState())
} else {
    state = new stateLib.State({
        "position": 0,
        "hp": 10,
        "max_hp": 10,
        "inventory": [],
        "visited": [0],
    })
}


//game start
map.initMap()
events["arrive"](state.position)
