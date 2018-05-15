const events = {
    "enableMoveButtons": enableMoveButtons,
    "log": log,
    "speak": speak,
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
