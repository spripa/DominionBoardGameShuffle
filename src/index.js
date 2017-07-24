'use strict';
var Alexa = require("alexa-sdk");
var appId = 'To ADD'; //Replace with your app ID. 'amzn1.echo-sdk-ams.app.your-skill-id';
var cards = require('./cards');
var game_deck = require('./game_deck');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
	
	alexa.resources = languageStrings;
    alexa.registerHandlers(newSessionHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    // Can also be started with NewSession instead of LaunchRequest
    'LaunchRequest': function() {
        // Initialise State
		this.attributes['shuffled_boardgame']='';
		
		this.attributes['speechOutput'] = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
		
        this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
    },

    'Unhandled': function() {
        this.emit(':ask', this.t("HELP_MESSAGE")+this.t("SESSION_OPEN_MESSAGE"), this.t("HELP_REPROMPT"));
    },

    "AMAZON.StopIntent": function() {
      this.emit(':tell', this.t("STOP_MESSAGE"));  
    },
    "AMAZON.CancelIntent": function() {
      this.emit(':tell', this.t("STOP_MESSAGE"));  
    },
   
   'SessionEndedRequest': function () {
        this.emit(":tell", this.t("STOP_MESSAGE"));
    },

	
    'AMAZON.HelpIntent': function() {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput']+this.t("SESSION_OPEN_MESSAGE"), this.attributes['repromptSpeech'])
    },
   

	//Core Intent for shuffling cards
	'DominionShuffle': function() {
		this.attributes['shuffled_boardgame']='';
		
		var GameSetName = this.event.request.intent.slots.Dominion_Games;
		var game_deck;
		var numberofcards;
		
		//Looking up the right cards set depending on the game type
		if (GameSetName && GameSetName.value) {
			if (GameSetName.value.toLowerCase() === 'seaside') {
				game_deck = this.t("DECK_SASIDE");
				numberofcards=10;
			} else if (GameSetName.value.toLowerCase() === 'intrigue') {
				game_deck = this.t("DECK_INTRIGUE");
				numberofcards=10;
			} else if (GameSetName.value.toLowerCase() === 'base set 2nd edition') {
				game_deck = this.t("DECK_BASE2");
				numberofcards=10;
			} else {
				game_deck = this.t("DECK");
				numberofcards=10;
			}
		} else {
			game_deck = this.t("DECK");
			numberofcards=10;
		}
		
		console.log(game_deck[1]);
		
		var speechOutput_listOFRandomCards = 'And the list of drawn cards is: ';
		var speechOutput_listOFRandomCards_Card = 'The list of drawn cards is as follows: ';
		var Common_Base_Cards_Card = 'And do not forget about the standard cards: Copper, Silver, Gold and  Estate, Duchy, Province.';
		
		// Creating an array with all the card values 
		var totalnr_cards = Object.keys(game_deck).length-1;
		var cards_list = Object.keys(game_deck).map(key =>game_deck[key]);
		
		var placeticker;
		var i;
		
		 
		for (i=0; i<numberofcards; i++) {
			
			placeticker=Math.floor(Math.random() * (totalnr_cards-i));
			
			//Constructing the output of shuffled cards with built in pause
			speechOutput_listOFRandomCards +='<break time=\'0.200ms\'/>';
			speechOutput_listOFRandomCards +=cards_list[placeticker];
			speechOutput_listOFRandomCards_Card = speechOutput_listOFRandomCards_Card + cards_list[placeticker]+'; ';
			cards_list.splice(placeticker,1);	
			
		}
		
				
		this.attributes['shuffled_boardgame'] = speechOutput_listOFRandomCards+'<break time=\'0.200ms\'/> '+Common_Base_Cards_Card;
		
        		
		this.emit(':askWithCard', this.attributes['shuffled_boardgame']+this.t("SESSION_OPEN_MESSAGE"), '', 'DOMINION BOARD GAME SHUFFLE', speechOutput_listOFRandomCards_Card+Common_Base_Cards_Card);
		
			
	
		
	},
	
	// Intent to allow repeating of the shuffled cards if none shuffled then repeat speechoutput reprompt variables
	'AMAZON.RepeatIntent': function() {
		if(this.attributes['shuffled_boardgame']==='') {this.emit(':ask', this.attributes['speechOutput']+this.t("SESSION_OPEN_MESSAGE"), this.attributes['repromptSpeech']);}
		else {this.emit(':ask', this.attributes['shuffled_boardgame']+this.t("SESSION_OPEN_MESSAGE"),this.t("CARD_REPEAT_MESSAGE"));}
		},

	// Function for the Card Details intent. Only covers Information per separate card rather than rules and restrictions per different set of cards.
	
	'DominionCardHelp': function() {
		
        var cardName = this.event.request.intent.slots.Dominion_Card;
		
		
        if (cardName && cardName.value) {
			var cardTitle = this.t("DISPLAY_CARD_TITLE", this.t("SKILL_NAME"), cardName.value.toLowerCase());
			var cards = this.t("CARDS");
			var card = cards[cardName.value.toLowerCase()];

			if (card) {
				this.attributes['speechOutput'] = card;
				this.attributes['repromptSpeech'] = this.t("CARD_REPEAT_MESSAGE");
				this.emit(':askWithCard', this.attributes['speechOutput']+this.t("SESSION_OPEN_MESSAGE"), this.attributes['repromptSpeech'], cardTitle, card);
			} else {

				this.emit(':ask', this.t("CARD_NOT_FOUND_MESSAGE"), this.t("CARD_NOT_FOUND_REPROMPT"));
			}
		} else {

            this.emit(':ask', this.t("CARD_NOT_FOUND_MESSAGE"), this.t("CARD_NOT_FOUND_REPROMPT"));
        }
		
    }
	
};



/*

*/
var languageStrings = {
    "en": {
        "translation": {
            "CARDS": cards.CARDS_EN_GB,
			"DECK": game_deck.BASE,
			"DECK_SASIDE": game_deck.SEASIDE,
			"DECK_INTRIGUE": game_deck.INTRIGUE,
			"DECK_BASE2": game_deck.BASE2,
            "SKILL_NAME": "Dominion Shuffle",
            "WELCOME_MESSAGE": "Welcome to %s. Do you want to Shuffle or Ask about a card?",
            "WELCOME_REPROMPT": "For instructions on what you can say, please say help me.",
            "DISPLAY_CARD_TITLE": "%s  - CARD Details for %s.",
            "HELP_MESSAGE": "You can ask to have a new game shuffled by saing Shuffle a New Game or you can say exit.",
            "HELP_REPROMPT": "You can say things like, Tell me more about the card name.",
            "STOP_MESSAGE": "Goodbye Dominion Board Gamer! Good Luck and see you soon.",
            "CARD_REPEAT_MESSAGE": "Try saying repeat.",
            "CARD_NOT_FOUND_MESSAGE": "I\'m sorry, I currently do not know this card. Do you want to try another card?",
            "CARD_NOT_FOUND_REPROMPT": "What else can I help with?",
			"SESSION_OPEN_MESSAGE": " Is there anything else you want to ask me?"
        }
    }
}
