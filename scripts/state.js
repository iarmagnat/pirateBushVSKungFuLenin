const itemStore = require("./inventory.js")
const storage = require("./helpers/localStorage.js")
const ls = new storage.helper()

function State(initialState) {

    this.set = function (attribute, value) {
        if (attribute === "inventory") {
            this.inventory.push(value)

            itemStore.addItemInIventory(value)
        } else if (attribute === "position" && !(this.visited.includes(value))) {
            this.visited.push(value)
            this[attribute] = value
        } else {
            this[attribute] = value
        }
        ls.saveState(this)
    }
    this.inventory = []
    this.visited = []
    for (let key in initialState) {
        if (key === "inventory") {
            for (let id in initialState[key]) {
                this.set("inventory", initialState.inventory[id])
            }
        } else {
            this.set(key, initialState[key])
        }
    }

    this.getStats = function() {
        return {
            "str": itemStore.strSum * itemStore.strMulti,
            "def": itemStore.defSum * itemStore.defMulti,
        }
    }
    this.getMaxHp = function() {
        return itemStore.hpMulti * itemStore.hpSum
    }
    this.changeHP = function(amount) {
        this.hp += amount
        // TODO: check if dead + death event, update UI, fidly tidly kidly
    }
}


module.exports = {"State": State, "ls": ls}
