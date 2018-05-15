const storage = require("./helpers/localStorage.js")
const ls = new storage.helper()

function State(initialState) {
    this.set = function (attribute, value) {
        this[attribute] = value
        if (attribute === "position" && !(this.visited.includes(value))) {
            this.visited.push(value)
        }
        ls.saveState(this)
    }

    this.visited = []
    for (let key in initialState) {
        this.set(key, initialState[key])
    }
}


module.exports = {"State": State, "ls": ls}
