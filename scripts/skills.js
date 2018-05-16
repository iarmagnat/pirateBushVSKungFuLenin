function SkillStore() {
    this.list = {
        "punch": punch,
    }
}

function punch(self, target) {
    const str = self.getStats().str
    const def = target.getStats().def
    const dmg = getRndInteger(1, 4) + str - def
    target.changeHp(dmg >=0 ? -dmg : 0)
    return dmg >=0 ? dmg : 0
}

const skillStore = new SkillStore()
module.exports = skillStore
