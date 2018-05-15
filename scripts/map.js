require("./texts.js")
const soundHelper = require("./helpers/soundHelper.js")

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
        "bg": "./assets/img/bkgd-top-dHss.webp",
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
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "n": {
                "id": 2
            },
            "s": {
                "id": 0
            }
        },
        "event": "choice",
        "event_args": {
            "text": "What will you choose?",
            "choices": texts["TestChoices"],
        },
        "coordinates": {
            "x": 0,
            "y": 1,
        },
    },
    2: {
        "id": 2,
        "bg": "",
        "color": "blue",
        "connections": {
            "e": {
                "id": 3
            },
            "s": {
                "id": 1
            }
        },
        "event": "teleportation",
        "event_args": 5,
        "coordinates": {
            "x": 0,
            "y": 2,
        },
    },
    3: {
        "id": 3,
        "bg": "",
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
        "bg": "",
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
        "bg": "./assets/img/bkgd-top-dHss.webp",
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

map.disableMoveButtons = function () {
    document.querySelectorAll(".interact__directions button").forEach(function (elmts) {
        elmts.disabled = true
    })
}

window.move = function (direction) {
    const current = map[state.position]
    // Check if movement is possible
    if (current.connections[direction]) {
        map.goTo(current.connections[direction].id)
    } else {
        // warn the user something is up
        console.log("Can't go there")
    }
}

map.goTo = function (id) {
    // Change state
    state.set("position", id)
    // Update map and screen
    map.updateMap()
    map.disableMoveButtons()
    // Launch the area's event
    events["arrive"](id)
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
    soundHelper.helper.setBgm('./assets/sounds/mainBgm.wav')
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

    for (let i in state.visited) {
        // console.log(state.visited[i])
        const current = map[state.visited[i]]
        const coordinates = map.getCoordinates(current.id)
        const node = document.querySelector(`#mapX${coordinates.x}Y${coordinates.y}`)
        node.classList.add(`map__area--${current.color}`)
        let domConnections = ""
        window.directions.forEach(function (e) {
            if (current.connections[e]) {
                domConnections += `<div class="map__connection map__connection--${e}"></div>`
            }
        })
        node.innerHTML = domConnections
    }

    this.updateMap()
    map.disableMoveButtons()
}

map.updateMap = function (nodeId = false) {
    if (!nodeId) {
        const current = map[state.position]
        const coordinates = this.getCoordinates(current.id)
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
