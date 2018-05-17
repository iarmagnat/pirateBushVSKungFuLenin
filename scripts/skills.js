function SkillStore() {
    this.list = {
        "punch": punch,
        "brouette_fu": brouette_fu,
    }
    this.createSkillButtons = function () {
        for (let key in this.list) {
            document.querySelector(".combat-buttons").innerHTML += `<button class="combat-buttons__button hidden" id="skillBtn-${key}" onclick="attack('${key}')">${key}</button>`
        }
    }
}

function punch(self, target) {
    const str = self.getStats().str
    const def = target.getStats().def
    const dmg = getRndInteger(1, 4) + str - def
    target.changeHp(dmg >= 0 ? -dmg : 0)
    return dmg >= 0 ? dmg : 0
}

function brouette_fu(self, target) {
    const str = self.getStats().str
    const def = target.getStats().def
    const dmg = getRndInteger(0, Math.floor(str / 2 + 1)) + def
    target.changeHp(dmg >= 0 ? -dmg : 0)
    return dmg >= 0 ? dmg : 0
}

const skillStore = new SkillStore()
module.exports = skillStore
