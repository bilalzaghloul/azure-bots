// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, ActivityTypes, EndOfConversationCodes } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            switch (context.activity.text.toLowerCase()) {
                case 'end':
                case 'stop':
                    await context.sendActivity({
                        type: ActivityTypes.EndOfConversation,
                        code: EndOfConversationCodes.CompletedSuccessfully,
                    });
                    break;
                default:
                    await context.sendActivity(`Echo Bot: ${context.activity.text}`);
                // await context.sendActivity('Say "end" or "stop" and I\'ll end the conversation and back to the parent.');
            }

            //const replyText = `Echo: ${context.activity.text}`;
            //await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    // await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
