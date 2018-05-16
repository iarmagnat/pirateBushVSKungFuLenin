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

            const width = (this.hp / this.getMaxHp() * 100) > 0 ? (this.hp / this.getMaxHp()) * 100 : 0
            document.querySelector(".hp-bar-actual").style.width = `${width}%`
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
    this.changeHp = function (amount) {
        this.set("hp", this.hp + amount)
        // TODO: check if dead + death event, fidly tidly kidly
        if (this.fight) {
            if (this.hp <= 0) {
                const events = require("./events")
                const nextEvent = state.fight.event

                events.concludeFight({
                    "dead": "human",
                    "name": capitalizeFirstLetter(this.name),
                    "event": nextEvent.event,
                    "event_args": nextEvent.event_args,
                })
            }
        }
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

    // Use with caution
    this.clearState = function() {
        ls.dropState()
    }
}


module.exports = {"State": State, "ls": ls}
