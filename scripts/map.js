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

        soundHelper.setBgm('./assets/sounds/mainBgm.wav')

        // soundHelper.playSfx('./assets/sounds/mainBgm.wav')
        // soundHelper.killSfx()

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
            node.classList.add("map__area--active")
            node.style.backgroundColor = current.color
            let domConnections = ""

            window.directions.forEach(function (e) {
                if (current.connections[e]) {
                    domConnections += `<div class="map__connection map__connection--${e}"></div>`
                }
            })
            node.innerHTML = domConnections

            // Center the map

            let height = parseFloat(window.getComputedStyle(document.querySelector(".map-container"), null).getPropertyValue("height").replace("px", "")) / 2 - 30
            let width = parseFloat(window.getComputedStyle(document.querySelector(".map-container"), null).getPropertyValue("width").replace("px", "")) / 2 - 60

            document.querySelector(".map").style.bottom = `${height - (30 * coordinates.y)}px`
            document.querySelector(".map").style.left = `${width - (30 * coordinates.x)}px`
        }
    }

    this.node_list = area_list
}

// create the map
const map = new Map({
    "initial_coordinates": {
        "x": 1,
        "y": 0,
    },
    "size": {
        "x": 4,
        "y": 7,
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
            "x": 1,
            "y": 0,
        },
    },
    1: {
        "id": 1,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "bgm": "./assets/sounds/orchestra.wav",
        "color": "blue",
        "connections": {
            "n": {
                "id": 2
            },
            "s": {
                "id": 0
            }
        },
        "event": "fight",
        "event_args": {
            "id": 0,
            "event": "readTexts",
            "event_args": {
                "text": [
                    "Wow, you've won!!"
                ],
                "event": "end",
                "event_args": ""
            },
        },
        "coordinates": {
            "x": 1,
            "y": 1,
        },
    },
    2: {
        "id": 2,
        "bg": "",
        "bgm": "./assets/sounds/synthsong1.wav",
        "color": "grey",
        "connections": {
            "e": {
                "id": 3
            },
            "s": {
                "id": 1
            },
            "w": {
                "id": 8
            },
        },
        "event": "teleportationChoice",
        "event_args": 5,
        "coordinates": {
            "x": 1,
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
            },
            "s": {
                "id": 9
            },
        },
        "event": "log",
        "event_args": "in area 3",
        "coordinates": {
            "x": 2,
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
            },
            "e": {
                "id": 6
            },
        },
        "event": "readTexts",
        "event_args": {
            "text": [
              "you've found a new item : " + itemStore.listItems[2]['name']+"<br>"+ itemStore.listItems[2]["desc"]
            ],
            "event": "pickItem",
            "event_args": {
                "id": 2,
                "event": "end",
                "event_args": "",
            },
        },
        "coordinates": {
            "x": 2,
            "y": 3,
        },
        "once": true,
        "then": "readTexts",
        "then_args": texts["testOnce"]
    },
    5: {
        "id": 5,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "s": {
                "id": 4
            },
            "n": {
                "id": 10
            },
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 2,
            "y": 4,
        },
    },
    6: {
        "id": 6,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "w": {
                "id": 4
            },
            "s": {
                "id": 7
            }
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 3,
            "y": 3,
        },
    },
    7: {
        "id": 7,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "n": {
                "id": 6
            },
        },
        "event": "readTexts",
        "event_args": {
          "text": ["this is the final brouette"],
          "event": "pickItem",
          "event_args": {
            "id": 1,
            "event": "end",
            "event_args": "",
          }
        },
        "once": true,
        "then": "readTexts",
        "then_args": texts["testOnce"],
        "coordinates": {
            "x": 3,
            "y": 2,
        },
    },
    8: {
        "id": 8,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "e": {
                "id": 2
            },
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 0,
            "y": 2,
        },
    },
    9: {
        "id": 9,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "n": {
                "id": 3
            },
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 2,
            "y": 1,
        },
    },
    10: {
        "id": 10,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "n": {
                "id": 11
            },
            "s": {
                "id": 5
            },
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 2,
            "y": 5,
        },
    },
    11: {
        "id": 11,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "s": {
                "id": 10
            },

        },
        /*"event": "fight",
        "event_args": {
            "id": 1,
            "event": "readTexts",
            "event_args": {
                "text": [
                    "Wow, you've won Internet/oil!!"
                ],
                "event": "end",
                "event_args": ""
            },
        },*/
        "event": "readTexts",
        "event_args": {
          "text": ["This is the final FIGHT !!!!!!!!!!!!!!!!!!"],
          "event": "fight",
          "event_args": {
              "id": 1,
              "event": "readTexts",
              "event_args": {
                  "text": [
                      "Wow, you've won Internet/oil!!"
                  ],
                  "event": "end",
                  "event_args": ""
              },
          },
        },

        "coordinates": {
            "x": 2,
            "y": 6,
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
