let readTexts = {
    "text": "[array] A list of each texts to be displayed. Use '<br>' for line jumps",
    "event": "event name",
    "event_args": "[plain object] Args for the event called after the user presses 'end'",
}

let pickItem = {
    "id": "[int] item's id",
    "event": "event name",
    "event_args": "[plain object] Args for the event called upon pickup",
}

let findItem = {
    "id": "[int] item's id",
    "event": "event name",
    "event_args": "[plain object] Args for the event called upon pickup",
}

let fight = {
    "event": "fight",
    "event_args": {
        "id": "[int] monster id",
        "event": "event name",
        "event_args": "[plain object] Args for the event called upon victory",
    },
}

let teleportationChoice = {
    "event": "teleportationChoice",
    "event_args": {
        "id": "map node ID",
        "text": "Choice text",
        "goText": "Jump in text",
        "stayText": "stay here text"
    }
}

let fullFight = {
    "event": "fullFight",
    "event_args": {
        "id": "[int] monster id",
        "startText": "[array] the text before the fight",
        "victoryText": "[array] the text after the fight, only in case of victory",
        "event": "event name",
        "event_args": "[plain object] Args for the event called upon victory"
    }
}

let pickItem = {
    "event": "pickItem",
    "event_args": {
        "id": "[int] object id",
        "event": "event name",
        "event_args": "[plain object] Args for the event called after pick up"
    }
}

let findItem = {
    "event": "pickItem",
    "event_args": {
        "id": "[int] object id",
        "event": "event name",
        "event_args": "[plain object] Args for the event called after pick up"
    }
}
