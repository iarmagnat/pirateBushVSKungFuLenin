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
}

sound = new SoundHelper()
module.exports = {"helper": sound}
