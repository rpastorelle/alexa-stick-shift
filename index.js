'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var SKILL_STATES = {
    START: "_STARTMODE",
    FIRST: "_FIRSTMODE",
    SECOND: "_SECONDMODE",
    THIRD: "_THIRDMODE",
    HELP: "_HELPMODE"
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, firstStateHandlers, secondStateHandlers, thirdStateHandlers, helpStateHandlers);
    alexa.execute();
};

// NewSession Handler
// ========================
var newSessionHandlers = {
    "LaunchRequest": function () {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "NewSessionIntent": function () {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("StartGame", true);
    },
    'GetModeIntent': function () {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("GetModeIntent");
    },
    "ChangeModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("ChangeModeIntent");
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "Unhandled": function () {
        var speechOutput = 'Unhandled New Session!';
        this.emit(":tell", speechOutput, speechOutput);
    }
};

// Start Mode Handler
// ========================
var startStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.START, {
    "StartGame": function (newGame) {
        var speechOutput = newGame ? 'Welcome to Stick Shift. ' : 'Welcome back! ';
        var askOutput = 'Would you like to be in first, second, or, third gear?';
        this.emit(":ask", speechOutput + askOutput, askOutput);
    },
    "ChangeModeIntent": function() {
        var nextMode = this.event.request.intent.slots.NextMode.value;

        if (nextMode == 'first' || nextMode == '1st') {
            this.attributes['myMode'] = 'first';
            this.handler.state = SKILL_STATES.FIRST;
        } else if (nextMode == 'second' || nextMode == '2nd') {
            this.attributes['myMode'] = 'second';
            this.handler.state = SKILL_STATES.SECOND;
        } else if (nextMode == 'third' || nextMode == '3rd') {
            this.attributes['myMode'] = 'third';
            this.handler.state = SKILL_STATES.THIRD;
        }

        this.emitWithState("EnterMode");
    },
    'GetModeIntent': function () {
        // Create speech output
        const myMode = this.attributes['myMode']
        const speechOutput = !! myMode ? "You are in " + this.attributes['myMode'] + " gear." : 'You are in neutral.';
        const askOutput = ' You can say: change gear, which gear, or, start over.';
        this.emit(':ask', speechOutput + askOutput, askOutput);
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "AMAZON.HelpIntent": function() {
        this.handler.state = SKILL_STATES.HELP;
        this.emitWithState("helpTheUser", true);
    },
    "Unhandled": function () {
        var speechOutput = 'Unhandled Start Mode!';
        this.emit(":tell", speechOutput, speechOutput);
    }
});

// First Mode Handler
// ========================
var firstStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.FIRST, {
    "EnterMode": function () {
        var speechOutput = "You're in first gear. It's alright. ";
        var askOutput = 'Would you like to be in first, second, or, third gear?';
        this.emit(":ask", speechOutput + askOutput, askOutput);
    },
    "ChangeModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("ChangeModeIntent");
    },
    "GetModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("GetModeIntent");
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "AMAZON.HelpIntent": function() {
        this.handler.state = SKILL_STATES.HELP;
        this.emitWithState("helpTheUser", true);
    },
    "Unhandled": function () {
        var speechOutput = 'Unhandled First Gear!';
        this.emit(":tell", speechOutput, speechOutput);
    }
});

// Second Mode Handler
// ========================
var secondStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.SECOND, {
    "EnterMode": function () {
        var speechOutput = "You're in second gear. I'll lean right. ";
        var askOutput = 'Would you like to be in first, second, or, third gear?';
        this.emit(":ask", speechOutput + askOutput, askOutput);
    },
    "ChangeModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("ChangeModeIntent");
    },
    "GetModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("GetModeIntent");
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "AMAZON.HelpIntent": function() {
        this.handler.state = SKILL_STATES.HELP;
        this.emitWithState("helpTheUser", true);
    },
    "Unhandled": function () {
        var speechOutput = 'Unhandled Second Gear!';
        this.emit(":tell", speechOutput, speechOutput);
    }
});

// Third Mode Handler
// ========================
var thirdStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.THIRD, {
    "EnterMode": function () {
        var speechOutput = "You're in third gear. Hang on tight. ";
        var askOutput = 'Would you like to be in first, second, or, third gear?';
        this.emit(":ask", speechOutput + askOutput, askOutput);
    },
    "ChangeModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("ChangeModeIntent");
    },
    "GetModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("GetModeIntent");
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "AMAZON.HelpIntent": function() {
        this.handler.state = SKILL_STATES.HELP;
        this.emitWithState("helpTheUser", true);
    },
    "Unhandled": function () {
        var speechOutput = 'Unhandled Third Gear!';
        this.emit(":tell", speechOutput, speechOutput);
    }
});

// Help Mode Handler
// ========================
var helpStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.HELP, {
    "helpTheUser": function (newGame) {
        var askMessage = newGame ? 'Would you like to start playing?' : 'Would you like to keep playing?';
        this.emit(":ask", askMessage, askMessage);
    },
    "ChangeModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("ChangeModeIntent");
    },
    "GetModeIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("GetModeIntent");
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "AMAZON.HelpIntent": function() {
        this.handler.state = SKILL_STATES.HELP;
        this.emitWithState("helpTheUser", true);
    },
    "Unhandled": function () {
        var speechOutput = 'Unhandled help mode!';
        this.emit(":tell", speechOutput, speechOutput);
    }
});
