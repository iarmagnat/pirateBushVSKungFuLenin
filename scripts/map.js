require("./texts.js")
// create the map
map = {
    "initial_coordinates": {
        "x": 0,
        "y": 0,
    },
    "size": {
        "x": 2,
        "y": 5,
    },
    0: {
        "id": 0,
        "bg": "path/to/image",
        "color": "grey",
        "connections": {
            "n": {
                "id": 1
            }
        },
        "event": "readTexts",
        "event_args": texts["TestText"],
        "coordinates": {
            "x": 0,
            "y": 0,
        },
    },
    1: {
        "id": 1,
        "bg": "path/to/image",
        "color": "blue",
        "connections": {
            "n": {
                "id": 2
            },
            "s": {
                "id": 0
            }
        },
        "event": "speak",
        "event_args": "in area 1",
        "coordinates": {
            "x": 0,
            "y": 1,
        },
    },
    2: {
        "id": 2,
        "bg": "path/to/image",
        "color": "blue",
        "connections": {
            "e": {
                "id": 3
            },
            "s": {
                "id": 1
            }
        },
        "event": "log",
        "event_args": "in area 2",
        "coordinates": {
            "x": 0,
            "y": 2,
        },
    },
    3: {
        "id": 3,
        "bg": "path/to/image",
        "color": "blue",
        "connections": {
            "n": {
                "id": 4
            },
            "w": {
                "id": 2
            }
        },
        "event": "log",
        "event_args": "in area 3",
        "coordinates": {
            "x": 1,
            "y": 2,
        },
    },
    4: {
        "id": 4,
        "bg": "path/to/image",
        "color": "blue",
        "connections": {
            "n": {
                "id": 5
            },
            "s": {
                "id": 3
            }
        },
        "event": "log",
        "event_args": "in area 4",
        "coordinates": {
            "x": 1,
            "y": 3,
        },
    },
    5: {
        "id": 5,
        "bg": "path/to/image",
        "color": "blue",
        "connections": {
            "s": {
                "id": 4
            }
        },
        "event": "log",
        "event_args": "in area 5",
        "coordinates": {
            "x": 1,
            "y": 4,
        },
    },
}

function disableMoveButtons (){
  document.querySelectorAll(".interact__directions button").forEach(function(elmts){
    elmts.disabled = true;
  })
}

window.move = function (direction) {
    const current = map[state.position]
    // Check if movement is possible
    if (current.connections[direction]) {
        // Change state
        state.set("position", current.connections[direction].id)
        // Update map and screen
        map.updateMap()
        disableMoveButtons();
        // Launch the area's event
        events[map[state.position].event](map[state.position].event_args)
    } else {
        // warn the user something is up
        console.log("Can't go there")
    }
}

map.getCoordinates = function (id) {
    if (map[id].coordinates) {
        return map[id].coordinates
    } else {
        //do something fancy.
    }
}

map.getMapSize = function () {
    if (map.size) {
        return map.size
    } else {
        // let current = map.initial_coordinates
        // let maxX = current.x
        // let maxY = current.y
        // for (let el in map) {
        //     console.log(el)
        //     if (el === String(parseInt(el))) {
        //         console.log("do stuff")
        //     }
        // }
    }
}

map.initMap = function () {
    const domMap = document.querySelector(".map")
    let content = ""
    const mapSize = this.getMapSize()
    for (let y = 0; y < mapSize.y; y++) {
        content += "<div class='map__row'>"
        for (let x = 0; x < mapSize.x; x++) {
            content += `<div id='mapX${x}Y${mapSize.y - y - 1}' class="map__area"></div>`
        }
        content += "</div>"
    }
    domMap.innerHTML = content
    this.updateMap()
    disableMoveButtons();
}

map.updateMap = function (nodeId = false) {
    if (!nodeId) {
        const current = map[state.position]
        const coordinates = this.getCoordinates(state.position)
        const node = document.querySelector(`#mapX${coordinates.x}Y${coordinates.y}`)
        const old = document.querySelector(".map__area--active")
        if (old) {
            old.classList.toggle("map__area--active")
        }
        node.classList.add("map__area--active", `map__area--${current.color}`)
        let domConnections = ""

        window.directions.forEach(function (e) {
            if (current.connections[e]) {
                domConnections += `<div class="map__connection map__connection--${e}"></div>`
            }
        })
        node.innerHTML = domConnections

        // Center the map
        document.querySelector(".map").style.bottom = `${100 - (30 * coordinates.y)}px`
        document.querySelector(".map").style.left = `${100 - (30 * coordinates.x)}px`
    }
}
