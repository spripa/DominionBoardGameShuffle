# Dominion Board Game Shuffle

## Intro
When Alexa appeared in our living room i've started thinking what can i do to augment some of our household activities. As a keen board gamer we have a few mobile apps to help us while playing like a Dominion Shuffler, counting scores for 7 Wonders and others.
The Dominion shuffler appeared an easy entry choice into _teaching_ alexa to shuffle the board for us. And this is in short what led to this public git project. 

The Dominion board game has a few versions with different card sets to play, but this particular implementation covers 4 sets (Base, Base2, Seaside and Intrigue) with a fixed 10 cards shuffle (having the ability to change the default 10 cards will be feature to be added i guess in a new version). The list of cards & descriptions where taken from [Dominion Cards Listing](http://dominion.diehrstraits.com/ "Dominion Cards List")


## Alexa Skill - General Set-up and Considerations
When i've started looking at what is required to be able to develop a new Alexa skill i had no [Amazon Developer](https://developer.amazon.com/edw/home.html) and no AWS accounts - thus needed to go through a slightly lengthier set-up than usual. Had to double check the terms when AWS asked for a credit card so that to make sure what is offered under Free terms covers the extent of my Alexa skill development curiosity.

The Amazon developer portal with Alexa SDK is quite explanatory, a few forms to fill in and you're done as long as you know what info goes where. The step by step readme from [this Alexa nodejs skill sample](https://github.com/alexa/skill-sample-nodejs-howto) helped me to get going.

The next step was to get my libraries and npm compiler for node.js working. Reasonably easy [steps to follow](https://docs.npmjs.com/getting-started/installing-node). And once done this cmd command does the trick ``..\GitHub\DominionBoardGameShuffle\src>npm install --save alexa-sdk``. Then *.zip the src contents and use that for your lambda function build.

When i ended in AWS to get my Lambda function going was looking for Alexa Skills Kit in my triggers list but couldn't find it! Do make sure you are in the right region. Only Ireland in the EU regions has got Alexa [AWS Lambda Ireland](https://eu-west-1.console.aws.amazon.com/lambda/). 

Then, once the Blank functions is created, upload your *.zip and then you're ready to Test. One tip here in case you don't use and IDE for compiling js code - check http://esprima.org/demo/validate.html as this helped me fix some missing commas issues.

Once the function compiled the next step is first Test of your skill. (For intents and utterances i've used the Beta Interaction Model builder and i think it was the easiest step to tackle considering i knew what my requirements for the skills were)

The first Test obviously failed. The tip here is pick what _skill sample_ you want to start from. I initially started from the one with a couple session handlers and that combined with emit ':tell' rather than ':ask' confused me for a while as sessions were what it seemed at the time randomly started/ended and some never started. Only after some research and actually reading through the SKD on ':tell' and ':ask' definitions and various articles regarding hacks on session ended flags did i appreciate the magnitude of my mistakes. 

After the smoke test using Amazon developer interface passed i moved to Test the skill on my actual device. The thrill of listening to your Alexa skill fail with unexpected errors and seeing that your random shuffle was picking the same card a couple of times made me smile at how useful is to have the thoroughness of test planning!

## Alexa Skill - Submission and Going Live
After the submission of the skill, Amazon came back in a couple of days with feedback. Looking through the [Submission Checklist](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-submission-checklist) beforehand is useful, but i still got caught on a couple of issues specifically on leaving the session open and missing an error handling issue that resulted in _"There was a problem with the requested skill's response"_. Fixing the session open issue was a lot to do with semantics of the speech output in the :ask emit section, as long as semantically the conversation is not left hanging and user is asked for further input it passes the checklist criteria.

As of 29.06.2017 my skill is live and can be activated on your [Alexa Device](https://www.amazon.co.uk/b?node=10068517031)





