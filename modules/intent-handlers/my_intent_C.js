/**
 * 
 * my_intent_C.js
 * Module with logic for handling specific DialogFlow intent interaction with Cisco CVP and 3rd party data sources
 * Author: Alfonso Sandoval
 * 
 */

 // Axios is a popular library for REST APIs calling in NodeJS. This is the library of choice for the purpose of this boilerplate
 const axios = require('axios');
 const config = require('../../config');
 module.exports = (agent) => {
    /***
     * 
     * 1) Retrieve parameters and entities from your intent
     * A good practice is to have a shared context between all the intents of interest within your agent, so that all variables (entities & parameters) and easily retrieved.
     * The non-expired contexts are stored in the agent.contexts dictionary within the agent instance.
     * IMPORTANT! The parameter's names are case sensitive. They must match those defined in the Web platform.
     */
    let MY_PARAM_1,MY_PARAM_2,MY_PARAM_3 = ''
    agent.contexts.forEach(
        element => {
            if (element.name == 'my_shared_session') {
                MY_PARAM_1 = element.parameters.myparam1;
                MY_PARAM_2 = element.parameters.myparam2;
                MY_PARAM_3 = element.parameters.myparam3;
                ///...
            }
        }
    );

    /***
     * 
     * 2) Retrieve variables sent from Cisco CVP
     * All variables defined in the DialogFlow block in CallStudio (later deployed in CVA) are retrieved from the originalRequest.payload portion of the agent instance.
     * If there are no variables passed (for example, when the agent is invoked from another source different from a phone call, like a chat agent), the originalRequest.payload portion will be undefined.
     * 
     */
    let parameter_sent_from_CVP = agent.originalRequest.payload.payload; 
    if (parameter_sent_from_CVP === undefined) {
        // No variables were passed from Cisco CVP, or the intent was invoked via a different source than a phone call, such as a chat agent
    }

    let PAYLOAD = {
        // Define your payload based on the API call required, using the data retrieved from the DialogFlow intent as well as Cisco CVP calling
        method: '<api_method>',
        url: `${config.DATA_SOURCE_ADDRESS_3}?other_api_request_parameters`,
        headers: {
            '<api_request_headers_param>' : '<api_request_headers_value>'
            //...
        }
    }
    // API invocation
    return axios(PAYLOAD)
        .then(function (response) {
            /***
             * 
             * 3) Send a parameter back to Cisco CVP
             * It is possible to send the data retrieved back to Cisco CVP for further call processing, or a flag value indicating the success or failure of the API operation in order to continue with the call flow accordingly.
             * 
             * A custom context must be created and assigned to the agent instance.
             * Within the context, it is possible to define several parameters as required.
             * The following example creates a context named "return_context" and assigns the parameters "myvalue" and "myaction" with their corresponding values.
             * 
             */
             let contextSubs = new Object();
             contextSubs = {
                 name: 'return_context',
                 lifespan: 3,
                 parameters: {
                     myvalue : '<my_retrieved_value_from_api>',
                     myaction: '<my_custom_flag>'
                 }
             };
             agent.context.set(contextSubs);
             /***
              * 
              * 4) Trigger an event within DialogFlow
              * The setFollowupEvent method triggers a specific intent within the agent.
              * The intent to trigger must have the tag specified in the "name" parameter of this function within the "event" field in the Web platform.
              * Additionally, this triggered intent can render dynamic text.
              * It is necessary to create the parameter in the return object (as shown below in the "mymessage" parameter), and invoke it as a variable with the "$mymessage" notation in the "Text or SSML Response" field instead of a fixed text.
              * 
              */
              agent.setFollowupEvent({
                name: 'return_event',
                parameters: {
                    message: `<speak>Your prompt goes here. It can include the retrieved value from your API as normal text for TTS processing. For example: the retrieved data is ${my_retrieved_value_from_api}</speak>`
                }        
            });
            return agent.add('');
        })
        .catch(function (err) {
            // Handle the exception raised
        });
};
