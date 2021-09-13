// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { DialogSet, DialogTurnStatus, WaterfallDialog, ComponentDialog,isComponentPathResolvers  } = require('botbuilder-dialogs');

const ROOT_DIALOG = 'RootDialog';
const ROOT_WATERFALL_DIALOG = 'RootWaterfallDialog';
const HELLO = 'Hello';
const HELP = 'Help';
const HEROCARD = 'HeroCard';
const MESSAGEBACK = 'msgback';
const MULTIDIALOG2 = 'MultiDialog2';
const MULTIDIALOG1 = 'MultiDialog1';
const THUMBNAILCARD = 'ThumbnailCard';
const ADAPTIVECARD ="AdaptiveCardDialog";
const O365CONNECTORECARD = 'O365ConnectorCard';
const POPUPSIGNINCARD = 'PopupSignInCard';
const BEGINdIALOG = 'BeginDialog';
const QUIZFULLDIALOG = 'QuizFullDialog';
const PORMPTDIALOG = 'PromptDialog';

const { HelloDialog } = require('./basic/helloDialog');
const { HelpDialog } = require('./basic/helpDialog');
const { HeroCardDialog } = require('./basic/heroCardDialog');
const { MessageBackDialog } = require('./basic/messagebackDialog');
const { MultiDialog1 } = require('./basic/multiDialog1');
const { MultiDialog2 } = require('./basic/multiDialog2');
const { ThumbnailCardDialog } = require('./basic/thumbnailCardDialog');
const { AdaptiveCardDialog } = require('./basic/adaptiveCardDialog');
const { O365ConnectorCardDialog } = require('./basic/o365connectorCardDialog');
const { PopupSigninCardDialog } = require('./basic/popupSigninCardDialog');
const { BeginDialogExampleDailog } = require('./moderate/beginDialogExampleDailog');
const { QuizFullDialog } = require('./moderate/quizFullDialog');
const { PromptDialog } = require('./moderate/promptDialog');
class RootDialog extends ComponentDialog{

    constructor() {
        super(ROOT_DIALOG);
        this.addDialog(new WaterfallDialog(ROOT_WATERFALL_DIALOG, [
            this.promptStep.bind(this),
        ]));
        this.addDialog(new HelloDialog(HELLO));
        this.addDialog(new HelpDialog(HELP));
        this.addDialog(new HeroCardDialog(HEROCARD));
        this.addDialog(new MessageBackDialog(MESSAGEBACK));
        this.addDialog(new MultiDialog1(MULTIDIALOG1));
        this.addDialog(new MultiDialog2(MULTIDIALOG2));
        this.addDialog(new ThumbnailCardDialog(THUMBNAILCARD));
        this.addDialog(new AdaptiveCardDialog(ADAPTIVECARD));
        this.addDialog(new O365ConnectorCardDialog(O365CONNECTORECARD));
        this.addDialog(new PopupSigninCardDialog(POPUPSIGNINCARD));
        this.addDialog(new BeginDialogExampleDailog(BEGINdIALOG));
        this.addDialog(new QuizFullDialog(QUIZFULLDIALOG));
        this.addDialog(new PromptDialog(PORMPTDIALOG));

        this.initialDialogId = ROOT_WATERFALL_DIALOG;
    }

       /**
     * The run method handles the incoming activity (in the form of a DialogContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} dialogContext
     */
        async run(context, accessor) {
            const dialogSet = new DialogSet(accessor);
            dialogSet.add(this);
    
            const dialogContext = await dialogSet.createContext(context);
            const results = await dialogContext.continueDialog();
            console.log(results);
            if (results.status === DialogTurnStatus.empty) {
                await dialogContext.beginDialog(this.id);
            }
        }

        async promptStep(stepContext) {
             var command = stepContext.context._activity.text;
             console.log(command);
             if(command.trim() =="hello" || command=="hi"){
                return await stepContext.beginDialog(HELLO);
            }
            else if(command.trim() =="help"){
                return await stepContext.beginDialog(HELP);
            }
            else if(command.trim() =="herocard"){
                return await stepContext.beginDialog(HEROCARD);
            }
            else if(command.trim() =="msgback"){
                return await stepContext.beginDialog(MESSAGEBACK);
            }
            else if(command.trim() =="multi dialog 1"){
                return await stepContext.beginDialog(MULTIDIALOG1);
            }
            else if(command.trim() =="multi dialog 2"){
                return await stepContext.beginDialog(MULTIDIALOG2);
            }
            else if(command.trim() == "thumbnailcard"){
                return await stepContext.beginDialog(THUMBNAILCARD);
            }
            else if(command.trim() == "adaptivecard"){
                return await stepContext.beginDialog(ADAPTIVECARD);
            }
            else if(command.trim() == "timezone"){
                await stepContext.context.sendActivity("Here is UTC time -"+stepContext.context._activity.timestamp);
                await stepContext.context.sendActivity('Here is Local Time - '+ stepContext.context._activity.localTimestamp);
            }
            else if(command.trim() == "connector card 1"||command.trim() == "connector card 2"||command.trim() == "connector card 3"){
                return await stepContext.beginDialog(O365CONNECTORECARD);
            }
            else if(command.trim() == "signin"){
                return await stepContext.beginDialog(POPUPSIGNINCARD);
            }
            else if(command.trim() == "dialogflow"){
                await stepContext.context.sendActivity("This is step1 in Root Dialog");
                await stepContext.context.sendActivity("This is step2 in Root Dialog");
                await stepContext.beginDialog(BEGINdIALOG);
                await stepContext.context.sendActivity("This is step3 in Root Dialog After triggering the Hello Dialog");
                return await stepContext.endDialog();
            }
            else if(command.trim() == "quiz"){
                await stepContext.context.sendActivity("Hi, Welcome to the fun quiz. Let's get started..");
                return await stepContext.beginDialog(QUIZFULLDIALOG);
            }
            else if(command.trim() == "prompt"){
                return await stepContext.beginDialog(PORMPTDIALOG);
            }
            await stepContext.context.sendActivity('Sorry,Cannot recognize the command');
        return await stepContext.endDialog();
        }
}
module.exports.RootDialog = RootDialog;