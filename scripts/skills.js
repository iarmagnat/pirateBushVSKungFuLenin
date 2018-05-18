const soundHelper = require("./helpers/soundHelper.js")

function SkillStore() {
    this.list = {
        "punch": simpleSkill("getRndInteger(1, 4) + str - def", './assets/sounds/argargarhh.wav'),
        "brouette_fu": simpleSkill("getRndInteger(0, Math.floor(str / 2 + 1)) + def", './assets/sounds/brouetteHit.mp3'),
    }
    this.createSkillButtons = function () {
        for (let key in this.list) {
            document.querySelector(".combat-buttons").innerHTML += `<button class="combat-buttons__button hidden" id="skillBtn-${key}" onclick="attack('${key}')">${key}</button>`
        }
    }
}

function simpleSkill(equation, sfx) {
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

const skillStore = new SkillStore()
module.exports = skillStore
