const texts = {
    "TestText": {
        "text": [
             "You are John Lenin, the kung-fu master. <br> We brought you back to fight against an unstoppable threat.<br><br>",
             "Here is your legendary bandana",
            "Go!",
        ],
        "event": "pickItem",
        "event_args": {
            "id": 0,
            "event": "end",
            "event_args": "",
        }
    },
    "testOnce": {
        "text": [
            "Nothing more to see here"
        ],
        "event": "end",
        "event_args": ""
    },
    "TestChoices": [
        {"text": "Choice 1", "event": "log", "event_args": "Choice 1 arg"},
        {
            "text": "Choice 2",
            "event": "choice",
            "event_args": {
                "text": "What will you choose?",
                "choices": [
                    {"text": "Choice 1", "event": "log", "event_args": "Choice 1 arg"},
                    {"text": "Choice 2", "event": "log", "event_args": "Choice 2 arg"},
                ]
            }
        },
        {"text": "Choice 3", "event": "log", "event_args": "Choice 3 arg"},
    ]
}

module.exports = texts