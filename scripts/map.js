map = {
    0: {
        "id": 0,
        "visible": false,
        "bg": "path/to/image",
        "bg_color": "grey",
        "connections": {
            "n": {
                "id": 1
            }
        },
        "callback": function () {
            console.log("in area 0")
        }
    },
    1: {
        "id": 1,
        "visible": false,
        "bg": "path/to/image",
        "bg_color": "red",
        "connections": {
            "s": {
                "id": 0
            }
        },
        "callback": function () {
            console.log("in area 1")
        }
    },
}

window.move = function (direction) {
    const current = map[state.position]
    if (current.connections[direction]) {
        state.position = current.connections[direction].id
        map[state.position].callback()
    } else {
        console.log("Can't go there")
    }
}