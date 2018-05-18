const monsterStore = require("./monsters.js")
const skillStore = require("./skills.js")

function FightHelper() {
    this.start = function (enemyId, event, event_args) {
        return new Fight(monsterStore.createMonster(enemyId), {"event": event, "event_args": event_args})
    }
}

function Fight(enemy, event) {
    this.enemy = enemy
    this.event = event
    this.humanTurn = true
    state.fight = this
    this.enemy.displayStatus()

    this.attack = function (skill, self, target) {
        this.humanTurn = !this.humanTurn
        const dmg = skillStore.list[skill](self, target)
        if (target.hp > 0) {
            // Imported here to avoid circular imports.
            const events = require("./events")

            events["readTexts"]({
                "text": [`${capitalizeFirstLetter(self.name)} dealt ${dmg} damage to ${capitalizeFirstLetter(target.name)}!`],
                "event": "continueFight",
                "event_args": ""
            })
        }
    }
}

const fightHelper = new FightHelper()
module.exports = fightHelper