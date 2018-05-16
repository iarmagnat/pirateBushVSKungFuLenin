const monsterStore = require("./monsters.js")

function FightHelper() {
    this.start = function(enemyId) {
        return new Fight(monsterStore.createMonster(enemyId))
    }
}

function Fight(enemy) {

}