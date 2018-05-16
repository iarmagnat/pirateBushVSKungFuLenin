const soundHelper = require("./helpers/soundHelper.js")
const texts = require("./texts")
const itemStore = require('./inventory.js')

function Map(area_list) {
    this.disableMoveButtons = function () {
        document.querySelectorAll(".interact__directions button").forEach(function (elmts) {
            elmts.disabled = true
        })
    }


    this.goTo = function (id) {
        this.disableMoveButtons()
        // Launch the area's event
        window.arrive(id)
    }

    this.getCoordinates = function (id) {
        if (this.node_list[id].coordinates) {
            return this.node_list[id].coordinates
        } else {
            //TODO: do something fancy.
        }
    }

    this.getMapSize = function () {
        if (this.node_list.size) {
            return this.node_list.size
        } else {
            //TODO: do something fancy.
        }
    }

    this.initMap = function () {

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
            const current = this.node_list[state.visited[i]]
            const coordinates = this.getCoordinates(current.id)
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
        this.disableMoveButtons()
    }

    this.updateMap = function (nodeId = false) {
        if (!nodeId) {
            const current = this.node_list[state.position]
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

            let height = parseInt(window.getComputedStyle(document.querySelector(".map-container"),null).getPropertyValue("height").replace("px",""))/2-15;
            let width = parseInt(window.getComputedStyle(document.querySelector(".map-container"),null).getPropertyValue("width").replace("px",""))/2-15;
            // Center the map
            document.querySelector(".map").style.bottom = `${height - (30 * coordinates.y)}px`
            document.querySelector(".map").style.left = `${width - (30 * coordinates.x)}px`
        }
    }

    this.node_list = area_list
}

// create the map
const map = new Map({
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
        "event_args": texts.list["TestText"],
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
            "choices": texts.list["TestChoices"],
        },
        "coordinates": {
            "x": 0,
            "y": 1,
        },
        "once": true,
        "then": "readTexts",
        "then_args": texts.list["testOnce"]
    },
    2: {
        "id": 2,
        "bg": "",
        "color": "grey",
        "connections": {
            "e": {
                "id": 3
            },
            "s": {
                "id": 1
            }
        },
        "event": "teleportationChoice",
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
        "event": "pickItem",
        "event_args": 0,
        "coordinates": {
            "x": 1,
            "y": 3,
        },
        "once": true,
        "then": "readTexts",
        "then_args": texts.list["testOnce"]
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
        "event": "end",
        "event_args": "in area 5",
        "coordinates": {
            "x": 1,
            "y": 4,
        },
    },
})

window.move = function (direction) {
    const current = map.node_list[state.position]
    // Check if movement is possible
    if (current.connections[direction]) {
        map.goTo(current.connections[direction].id)
    } else {
        // warn the user something is up
        console.log("Can't go there")
    }
}

module.exports = {"object": map}
