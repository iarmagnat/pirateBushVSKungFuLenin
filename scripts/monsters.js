function MonsterStore() {
    this.list = {
        0: {
            "id": 0,
            "name": "lazer chick",
            "img": "",
            "stats": {
                "str": 5,
                "def": 5,
                "hp": 5,
            },
            "skill": 0
        }
    }

    this.
}

function Monster(monster) {
    this.stats = monster.stats
    this.name = monster.name
    this.skill = monster.skill
    this.maxHp = monster.stats.hp
    this.hp = monster.stats.hp

    this.getStats = function() {
        return this.stats
    }

    this.getMaxHp = function() {
        return this.maxHp
    }

    this.changeHp = function(amount) {
        this.hp += amount
        // TODO: check if dead + death event, update UI, fidly tidly kidly
    }
}