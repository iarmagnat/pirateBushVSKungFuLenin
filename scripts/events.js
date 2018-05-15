events = {
    "enableMoveButtons": enableMoveButtons,
    "log": log,
    "choice": choice,
    "readTexts": readTexts,
    "teleportation": teleportation,
    "arrive" : arrive,
}

function enableMoveButtons(arg) {
    document.querySelectorAll(".interact__directions button").forEach(function (elmts) {
        elmts.disabled = false
    })
}

function log(arg) {
    console.log(arg)
    enableMoveButtons()
}

window.execChoice = function (event) {
    document.querySelector(".choice-wrapper").classList.add("hidden")
    events[event["event"]](event["event_args"])
}

function teleportation(arg){
  map.goTo(arg);
}

function choice(arg) {
    console.log(arg)
    document.querySelector(".choice-wrapper").classList.remove("hidden")
    const domButtons = document.querySelector(".choice-wrapper__buttons")
    let buttons = ""
    for (let i in arg["choices"]) {
        const button = arg["choices"][i]
        buttons += `<button class="choice-wrapper__button" onclick='execChoice(${JSON.stringify(button)})'>${button.text}</button>`
    }
    domButtons.innerHTML = buttons
}

function readTexts(arg) {
    document.querySelector(".simpleText").classList.remove('hidden')
    const domButton = document.querySelector(".simpleText button")
    domButton.innerHTML = "Next"
    jsonArg = JSON.stringify(arg)
    domButton.dataset.arg = jsonArg
    domButton.dataset.index = 0
    document.querySelector(".simpleText p").innerHTML = arg['text'][0]
    if (arg['text'].length == 1) {
        domButton.innerHTML = "End"
    }
}

window.nextText = function () {
    const domButton = document.querySelector(".simpleText button")
    const index = parseInt(domButton.dataset.index)
    const arg = JSON.parse(domButton.dataset.arg)
    if (arg['text'].length > index + 1) {
        document.querySelector(".simpleText p").innerHTML = arg['text'][index + 1]
        domButton.dataset.index = index + 1
        if (arg['text'].length === index + 2) {
            domButton.innerHTML = "End"
        }
    } else {
        document.querySelector(".simpleText").classList.add('hidden')
        events[arg["event"]](arg["event_args"])

    }
}

function arrive(arg){
  node = map[arg];
  console.log(node);
  if(node["bg"] !== ""){
    //debugger
    document.querySelector(".main").style.backgroundImage = "url('"+node["bg"]+"')";
  }else{
    document.querySelector(".main").style.backgroundImage = "url('./assets/img/bkgd-top.png')";
  }
}
