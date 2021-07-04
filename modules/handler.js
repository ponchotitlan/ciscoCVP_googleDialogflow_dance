/**
 * 
 * handler.js
 * Interaction handler between DialogFlow and custom modules
 * Author: Alfonso Sandoval
 * 
 */

// Google DialogFlow library
const {
    WebhookClient
} = require('dialogflow-fulfillment');

/**
 * 
 * Intent modules zone:
 * The logic for handling each intent can be declared in separate modules, in individual .js files.
 * This enables a clean and modular "plug-in plug-out" based architecture for your intents.
 * 
 */
const MY_INTENT_A = require('./intent-handlers/my_intent_A');
const MY_INTENT_B = require('./intent-handlers/my_intent_B');
const MY_INTENT_C = require('./intent-handlers/my_intent_C');
//...

module.exports = (req, res) => {
    /**
     * 
     * The DialogFlow library enables the individual mapping of intent modules with the agent handler.
     * The only restriction is that the only input parameter is the agent instance per se.
     *  
     */

    //Google DialogFlow agent instance
    const agent = new WebhookClient({
        request: req,
        response: res
    });    

    /**
     * 
     * Want to debug the incoming webhook requests? You can print the structures in JSON as follows:
     * console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers, null, 4));
     * console.log('Dialogflow Request body: ' + JSON.stringify(req.body, null, 4));
     * 
     */

    /**
     * 
     * Module-Agent mapping zone:
     * A single module can be mapped to multiple DialogFlow agents.
     * IMPORTANT! intent names are case-sensitive. They must match exactly the names in the DialogFlow web platform.
     * 
     */
    let intentMap = new Map();
    intentMap.set('name_of_my_intent_A_in_dialogflow', MY_INTENT_A);
    intentMap.set('name_of_my_intent_B_in_dialogflow', MY_INTENT_B);
    intentMap.set('name_of_my_intent_C_in_dialogflow', MY_INTENT_C);
    ///...

    // Setup of the map object into the agent instance
    agent.handleRequest(intentMap);
};