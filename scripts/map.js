const soundHelper = require("./helpers/soundHelper.js")

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
const node_list = require("./game/node_list")
const map = new Map(node_list)

window.move = function (direction) {
    const current = map.node_list[state.position]
    // Check if movement is possible
    if (current.connections[direction]) {
        map.goTo(current.connections[direction].id)
    } else {
        soundHelper.playSfx('./assets/sounds/nope.mp3')
        // warn the user something is up
        // console.log("Can't go there")
    }
}

module.exports = map
