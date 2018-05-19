const texts = require("./texts")

const node_list = {
    // "initial_coordinates": {
    //     "x": 1,
    //     "y": 0,
    // },
    "size": {
        "x": 4,
        "y": 7,
    },
    0: {
        "id": 0,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "grey",
        "connections": {
            "n": {
                "id": 1
            }
        },
        "event": "readTexts",
        "event_args": texts["openingText"],
        "coordinates": {
            "x": 1,
            "y": 0,
        },
        "once": true,
        "then": "end",
        "then_args": "",
    },
    1: {
        "id": 1,
        "color": "blue",
        "connections": {
            "n": {
                "id": 2
            },
            "s": {
                "id": 0
            }
        },
        "event": "fullFight",
        "event_args": {
            "id": 0,
            "startText": ["Wow! A Neon chick is coming for you!"],
            "victoryText": ["Wow! You didn't die to a chicken"],
            "event": "end",
            "event_args": "",
        },
        "coordinates": {
            "x": 1,
            "y": 1,
        },
    },
    2: {
        "id": 2,
        "bgm": "./assets/sounds/synthsong1.wav",
        "color": "grey",
        "connections": {
            "e": {
                "id": 3
            },
            "s": {
                "id": 1
            },
            "w": {
                "id": 8
            },
        },
        "event": "teleportationChoice",
        "event_args": {
            "id": 5,
            "text": "You find yourself in front of a teleporter. Are you a safe or a crazy man?",
            "goText": "Jump in!!",
            "stayText": "Be a chicken"
        },
        "coordinates": {
            "x": 1,
            "y": 2,
        },
    },
    3: {
        "id": 3,
        "color": "blue",
        "connections": {
            "n": {
                "id": 4
            },
            "w": {
                "id": 2
            },
            "s": {
                "id": 9
            },
        },
        "event": "log",
        "event_args": "in area 3",
        "coordinates": {
            "x": 2,
            "y": 2,
        },
    },
    4: {
        "id": 4,
        "color": "blue",
        "connections": {
            "n": {
                "id": 5
            },
            "s": {
                "id": 3
            },
            "e": {
                "id": 6
            },
        },
        "event": "readTexts",
        "event_args": {
            "text": [
                "Oh what is this?"
            ],
            "event": "findItem",
            "event_args": {
                "id": 2,
                "event": "end",
                "event_args": "",
            },
        },
        "coordinates": {
            "x": 2,
            "y": 3,
        },
        "once": true,
        "then": "readTexts",
        "then_args": texts["testOnce"]
    },
    5: {
        "id": 5,
        "bg": "./assets/img/bkgd-top-dHss.webp",
        "color": "blue",
        "connections": {
            "s": {
                "id": 4
            },
            "n": {
                "id": 10
            },
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 2,
            "y": 4,
        },
    },
    6: {
        "id": 6,
        "color": "blue",
        "connections": {
            "w": {
                "id": 4
            },
            "s": {
                "id": 7
            }
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 3,
            "y": 3,
        },
    },
    7: {
        "id": 7,
        "color": "blue",
        "connections": {
            "n": {
                "id": 6
            },
        },
        "event": "readTexts",
        "event_args": {
            "text": ["this is the final brouette"],
            "event": "pickItem",
            "event_args": {
                "id": 1,
                "event": "end",
                "event_args": "",
            }
        },
        "once": true,
        "then": "readTexts",
        "then_args": texts["testOnce"],
        "coordinates": {
            "x": 3,
            "y": 2,
        },
    },
    8: {
        "id": 8,
        "color": "blue",
        "connections": {
            "e": {
                "id": 2
            },
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 0,
            "y": 2,
        },
    },
    9: {
        "id": 9,
        "color": "blue",
        "connections": {
            "n": {
                "id": 3
            },
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 2,
            "y": 1,
        },
    },
    10: {
        "id": 10,
        "color": "blue",
        "connections": {
            "n": {
                "id": 11
            },
            "s": {
                "id": 5
            },
        },
        "event": "end",
        "event_args": "",
        "coordinates": {
            "x": 2,
            "y": 5,
        },
    },
    11: {
        "id": 11,
        "color": "blue",
        "connections": {
            "s": {
                "id": 10
            },

        },
        "event": "readTexts",
        "event_args": {
            "text": ["This is the final FIGHT !!!!!!!!!!!!!!!!!!"],
            "event": "fight",
            "event_args": {
                "id": 1,
                "event": "readTexts",
                "event_args": {
                    "text": [
                        "Wow, you've won Internet/oil!!"
                    ],
                    "event": "end",
                    "event_args": ""
                },
            },
        },
        "coordinates": {
            "x": 2,
            "y": 6,
        },
    },
}

module.exports = node_list