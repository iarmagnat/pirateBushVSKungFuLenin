events = {
    "enableMoveButtons": enableMoveButtons,
    "log": log,
    "speak": speak,
    "readTexts": readTexts,
}

function enableMoveButtons (arg){
  document.querySelectorAll(".interact__directions button").forEach(function(elmts){
    elmts.disabled = false;
  })
}

function speak (arg){
  console.log("Hey I'm not John");
  //debugger
  enableMoveButtons();
}

function log (arg){
  console.log(arg);
  enableMoveButtons();
}

function readTexts (arg){
  document.querySelector(".simpleText").classList.remove('hidden');
  console.log(arg);
  const domButton = document.querySelector(".simpleText button");
  domButton.innerHTML = "Next";
  jsonArg = JSON.stringify(arg);
  domButton.dataset.arg = jsonArg;
  domButton.dataset.index = 0;
  document.querySelector(".simpleText p").innerHTML = arg['text'][0];
  if(arg['text'].length == 1){
    domButton.innerHTML = "End";
  }
  //enableMoveButtons();
}

window.nextText = function(){
  const domButton = document.querySelector(".simpleText button");
  const index = parseInt(domButton.dataset.index);
  const arg = JSON.parse(domButton.dataset.arg);
  console.log(arg);
  if(arg['text'].length > index+1){
    document.querySelector(".simpleText p").innerHTML = arg['text'][index+1];
    domButton.dataset.index = index + 1;
    if(arg['text'].length === index+2){
      domButton.innerHTML = "End";
    }
  }else {
    document.querySelector(".simpleText").classList.add('hidden');
    events[arg["event"]](arg["event_args"]);

  }
}
