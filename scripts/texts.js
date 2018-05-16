const texts = {
    "TestText": {
        "text": [
            "I m not a potato",
            "I am a navet"
        ],
        "event": "log",
        "event_args": "stringP"
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

module.exports = {"list": texts}