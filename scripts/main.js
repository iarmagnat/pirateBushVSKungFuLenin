require("./events")
require("./state.js")
require("./map.js")

// initialize play area
window.directions = ["n", "s", "e", "w"]

//game start
events[map[state.position].event](map[state.position].event_args)
map[state.position].vivible = true
map.initMap()