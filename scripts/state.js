state = {
    "position": 0,
    "hp": 10,
    "max_hp": 10,
    "inventory": [],
    "visited": [0],
}

state.set = function (attribute, value) {
    this[attribute] = value
    if (attribute === "position" && !(this.visited.includes(value))) {
        this.visited.push(value)
    }
}