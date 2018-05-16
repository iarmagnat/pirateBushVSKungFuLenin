const itemStore = require("./inventory.js")
const storage = require("./helpers/localStorage.js")
const ls = new storage.helper()

function State(initialState) {

    this.set = function (attribute, value) {
        if (attribute === "inventory") {
            if (!this.inventory.includes(value)) {
                this.inventory.push(value)
                itemStore.addItemInIventory(value)
            }
        } else if (attribute === "position" && !(this.visited.includes(value))) {
            this.visited.push(value)
            this[attribute] = value
        } else if (attribute === "hp") {

            this[attribute] = value

            document.querySelector(".hp-actual").innerHTML = String(value)
            document.querySelector(".hp-max").innerHTML = this.getMaxHp()
            document.querySelector(".hp-bar-actual").style.width = `${value / this.getMaxHp() * 100}%`
        }else if (attribute === "fight"){
            return
        } else {
            this[attribute] = value
        }
        ls.saveState(this)
    }

    this.getStats = function () {
        return {
            "str": itemStore.strSum * itemStore.strMulti,
            "def": itemStore.defSum * itemStore.defMulti,
        }
    }
    this.getMaxHp = function () {
        return itemStore.hpMulti * itemStore.hpSum
    }
    this.changeHP = function (amount) {
        this.set("hp", this.hp + amount)
        // TODO: check if dead + death event, update UI, fidly tidly kidly
    }

    this.inventory = []
    this.visited = []
    for (let key in initialState) {
        console.log(key)
        if (key === "inventory") {
            for (let id in initialState[key]) {

                this.set("inventory", initialState.inventory[id])
            }
        } else {
            this.set(key, initialState[key])
        }
    }
}


module.exports = {"State": State, "ls": ls}
