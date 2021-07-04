# The logic within an intent handling module

```  
                                         +------------------------+                       
                                         |                        |                       
                                         |                        |                       
                                         |    Google DialogFlow   |                       
                                         |                        |                       
                                         |                        |                       
                                         +------------------------+                       
                                                 |        |                               
                                                 |        |    Webhooks                   
                     -> Intent params            |        |                               
                     <- API results/flags/prompt |        |                               
                                         +------------------------+                       
                                         |                        |                       
                                         |    NodeJS Web Server   |                       
                                         |    (Intent Handler)    |                       
                                         |                        |                       
                                         +------------------------+                       
                                           |          |         |                         
                                           |          |         |                         
                                   +--------+    +--------+    +------------+            
                                   |  CRM   |    |  API   |    |  3rd Party |             
                                   +--------+    +--------+    |    API     |             
                                                               +------------+             
```  

1. Retrieve parameters and entities from your intent
A good practice is to have a shared context between all the intents of interest within your agent, so that all variables (entities & parameters) and easily retrieved.
The non-expired contexts are stored in the agent.contexts dictionary within the agent instance.
IMPORTANT! The parameter's names are case sensitive. They must match those defined in the Web platform.

2. Retrieve variables sent from Cisco CVP
All variables defined in the DialogFlow block in CallStudio (later deployed in CVA) are retrieved from the originalRequest.payload portion of the agent instance.
If there are no variables passed (for example, when the agent is invoked from another source different from a phone call, like a chat agent), the originalRequest.payload portion will be undefined.

``` 
    let SucSuscriptor = agent.originalRequest.payload.payload; 
    if (SucSuscriptor === undefined) {
        // No variables were passed from Cisco CVP, or the intent was invoked via a different source than a phone call, such as a chat agent
    }
``` 

3. Send a parameter back to Cisco CVP
It is possible to send the data retrieved back to Cisco CVP for further call processing, or a flag value indicating the success or failure of the API operation in order to continue with the call flow accordingly.
A custom context must be created and assigned to the agent instance.
Within the context, it is possible to define several parameters as required.
The following example creates a context named "return_context" and assigns the parameters "myvalue" and "myaction" with their corresponding values.

``` 
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
``` 

4. Trigger an event within DialogFlow
The setFollowupEvent method triggers a specific intent within the agent.
The intent to trigger must have the tag specified in the "name" parameter of this function within the "event" field in the Web platform.
Additionally, this triggered intent can render dynamic text.
It is necessary to create the parameter in the return object (as shown below in the "mymessage" parameter), and invoke it as a variable with the "$mymessage" notation in the "Text or SSML Response" field instead of a fixed text.

![CVP General Diagram](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/blob/main/screenshots/df_01.PNG)
![CVP General Diagram](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/blob/main/screenshots/df_02.PNG)