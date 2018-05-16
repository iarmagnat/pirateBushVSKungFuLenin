howler = require("howler")

function SoundHelper() {
    this.setBgm = function (soundUrl) {
        if (this.bgm) {
            this.bgm.unload()
            this.bgm._src = soundUrl
            this.bgm.load()
        } else {
            this.bgm = new Howl({
                src: [soundUrl],
                loop: true,
            })
        }
        this.bgm.play()
    }
    this.playSfx = function (soundUrl) {
        if (this.sfx) {
            this.sfx.unload()
            this.sfx._src = soundUrl
            this.sfx.load()
        } else {
            this.sfx = new Howl({
                src: [soundUrl],
            })
        }
        this.sfx.play()
    }
}

sound = new SoundHelper()
module.exports = {"helper": sound}
