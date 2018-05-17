howler = require("howler")

function SoundHelper() {
    this.actualBgmPath = ""

    this.setBgm = function (soundUrl) {
        if (soundUrl === this.actualBgmPath) {
            return
        }
        if (this.bgm) {
            this.bgm.unload()
            delete this.bgm
        }

        this.bgm = new Howl({
            src: [soundUrl],
            loop: true,
        })

        this.actualBgmPath = soundUrl
        this.bgm.play()
    }

    this.playSfx = function (soundUrl) {
        if (this.sfx) {
            this.killSfx()
        }
        this.sfx = new Howl({
            src: [soundUrl],
        })

        this.sfx.play()
    }

    this.killSfx = function () {
        delete this.sfx
    }

    this.playSfxText = function () {
        let soundUrl = "./assets/sounds/fight.wav"
        if (this.sfxText) {
            this.sfxText.stop()
            this.sfxText._src = soundUrl
            this.sfxText.load()
        } else {
            this.sfxText = new Howl({
                src: [soundUrl],
            })
        }
        this.sfxText.play()
    }
    this.killSfxText = function () {
        this.sfxText.stop()
    }
}

sound = new SoundHelper()
module.exports = sound
