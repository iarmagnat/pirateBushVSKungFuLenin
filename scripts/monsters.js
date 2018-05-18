const creatures = require("./game/creatures")

function MonsterStore() {
    this.list = creatures

    this.createMonster = function (id) {
        return new Monster(this.list[id])
    }
}

function Monster(monster) {
    this.stats = monster.stats
    this.name = monster.name
    this.img = monster.img
    this.skill = monster.skill
    this.maxHp = monster.stats.hp
    this.hp = monster.stats.hp

    this.getStats = function () {
        return this.stats
    }

    this.getMaxHp = function () {
        return this.maxHp
    }

    this.changeHp = function (amount) {
        this.hp += amount
        this.displayStatus()

        if (this.hp <= 0) {
            // Imported here to avoid circular imports.
            const events = require("./events")
            const nextEvent = state.fight.event

            events.concludeFight({
                "dead": "enemy",
                "name": capitalizeFirstLetter(this.name),
                "event": nextEvent.event,
                "event_args": nextEvent.event_args,
            })
        }
    }

    this.displayStatus = function () {
        document.querySelector(".enemy-hp-actual").innerHTML = this.hp
        document.querySelector(".combat-block__name").innerHTML = capitalizeFirstLetter(this.name)
        document.querySelector(".combat-block__img").src = this.img
        document.querySelector(".enemy-hp-max").innerHTML = this.getMaxHp()

        const width = (this.hp / this.getMaxHp() * 100) > 0 ? (this.hp / this.getMaxHp()) * 100 : 0
        document.querySelector(".enemy-hp-bar-actual").style.width = `${width}%`
    }
}

monsterStore = new MonsterStore()

module.exports = monsterStore
