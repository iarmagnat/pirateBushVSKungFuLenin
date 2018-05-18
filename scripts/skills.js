const soundHelper = require("./helpers/soundHelper.js")

function SkillStore() {
    this.list = {
        "punch": simpleAttack("getRndInteger(1, 4) + str - def", './assets/sounds/argargarhh.wav'),
        "brouette_fu": simpleAttack("getRndInteger(0, Math.floor(str / 2 + 1)) + def", './assets/sounds/brouetteHit.mp3'),
        "tinyHeal": simpleHeal("getRndInteger(1, 6)")
    }
    this.createSkillButtons = function () {
        for (let key in this.list) {
            document.querySelector(".combat-buttons").innerHTML += `<button class="combat-buttons__button hidden" id="skillBtn-${key}" onclick="attack('${key}')">${key}</button>`
        }
    }
}

function simpleAttack(equation, sfx) {
    return function (self, target) {
        const str = self.getStats().str
        const def = target.getStats().def
        const dmg = eval(equation)
        if (target.hp - dmg > 0) {
            soundHelper.playSfx(sfx)
        }
        target.changeHp(dmg >= 0 ? -dmg : 0)
        return dmg >= 0 ? dmg : 0
    }
}
function simpleHeal(amount) {
    return function(self, target) {
        const maxHp = self.getMaxHp()
        const value = eval(amount)

        if (self.hp > maxHp) {
            // no over heal here
        } else if (self.hp + value >= maxHp) {
            self.changeHp(maxHp - self.hp)
        } else {
            self.changeHp(value)
        }
        return value
    }
}

const skillStore = new SkillStore()
module.exports = skillStore
