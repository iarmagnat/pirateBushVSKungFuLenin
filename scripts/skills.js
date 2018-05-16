function SkillStore() {
    this.list = {
        "punch": punch,
    }
}

function punch(self, target) {
    const str = self.getStats().str
    const def = target.getStats().def
    const dmg = getRndInteger(1, 4) + str - def
    target.changeHP(dmg)
}

// return rand int between min included and max excluded
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}