howler = require("howler")

function SoundHelper(){
  this.setBgm = function(soundUrl){
    if(this.bgm){
      debugger
      this.bgm.stop().unload();
      this.bgm.src = soundUrl;
    }else{
      this.bgm = new Howl({
        src: [soundUrl],
        autoplay: false,
        loop: true,
        volume: 2,
        onend: function() {
          console.log('Groov boys!');
        }
      });
      this.bgm.play();
    }

  }
}
sound = new SoundHelper();
module.exports = {"helper": sound}
