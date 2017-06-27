# Dominion Board Game Shuffle

## Intro
When Alexa appeared in our living room i started thinking what can i do augment some of our household activities. As a keen boardgamer we have a few mobile apps to help us while playing like a Dominion Shuffler, counting scores for 7 Wonders and others.
The Dominion shuffler appeared an easy entry choice into _teaching_ alexa to shuffle the board for us. And this is in short what led to this public git project. 

The boardgame dominion has a few versions and different cards to play, but this particular implementation covers 4 sets (Base, Base2, Seaside and Intrigue) with a fixed 10 cards shuffle (feature to be added i guess in a new version). The list of cards & descriptions where taken from [Dominion Cards Listing](http://dominion.diehrstraits.com/ "Dominion Cards List")


## Alexa Skill - General Set-up and Considerations
When i started looking at what is required to be able to develop a new Alexa skill i had no Amazon Developer account and no AWS - thus needed to go through a slightly lengthier set-up than usual. Had to double check the terms when AWS asked for a credit card so that to make sure what is offered under Free terms covers my Alexa skill development curiosity.

The Amazon developer portal with Alexa SDK is quite explanatory, a few forms to fill in and you're done as long as you know what info goes where. This Intro article helped me to get going: 

The next step was to get my libraries and npm compiler for node.js working. Reasonably easy steps to follow. And once done this cmd command does the trick <..\GitHub\DominionBoardGameShuffle\src>npm install --save alexa-sdk>. The *.zip the src contents and use that for your lambda functiona build.

When i ended in AWS to get my Lambda function going was looking for Alexa Skils Kit in my triggers list but couldn't find it! Do make sure you are in the right region. Only Ireland in the EU regions has got Alexa [AWS Lambda Ireland](https://eu-west-1.console.aws.amazon.com/lambda/). 

Then, once the Blank functions is created, upload your *.zip and then you're ready to Test. One tip here in case you don't use and IDE for compiling js code - check http://esprima.org/demo/validate.html as this helped me fix some missing commas issues.

Once the function compiled the next step is first Test of your skill. (For intents and utterances i've used the beta builder and i think it was the easiest step to tackle considering i knew what my requirements for the skills were)

The first Test obviously failed. The tip here is pick what skill_sample you want to start from. I initially started from the one with a couple session handlers and that combined with emit ':tell' rather than ':ask' confused me for a while as sessions were what it seemed at the time randomly started/ended and some never started :) Only after some research and actually reading through the SKD on ':tell' and ':ask' definitions and various articles reg. hacks on sessionended flags did i appreciate the magnitude of my mistakes. 

After the smoke test using Amazon developer interface passed i moved to Test the skill on my actual device. The thrill of listening to your Alexa skill fail with unexpected erorrs and seeing that your random shuffle was picking the same card a couple of times made me smile at how useful is to have the thoroughness of test planning :)

## Conclusion




