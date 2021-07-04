# Setting up the interaction between Cisco CVP and Google DialogFlow

The Cisco CallStudio flow designer has with specific blocks for interaction with DialogFlow. The block "Voice Element - DialogFlow" enables the triggering of a specific intent within a DialogFlow agent with the specification of a Training Phrase. From this point onwards, the call flow passes to DialogFlow.
It is possible to send parameters from CVP to DialogFlow with this block for the use cases in which a variable previously retrieved in the call flow is required for a DialogFlow TTS prompt or API operation (ex. retrieve customer balance with calling ANI, etc).
Additionally, CVP can retrieve general parameters from DialogFlow. This is useful for use cases such as working with retrieved API data (ex. user identified - Customer ID for the rest of the call flow) or deciding on the rest of the call flow with a control variable (ex. transfer the call to an agent or ending the call).

```
+-------------------------+                                 +------------------------+                       
|                         | Call flow variable (ID, etc) -> |                        |                       
|                         |  ------------------------------ |                        |                       
|        Cisco CVP        |                                 |    Google DialogFlow   |                       
|                         |  ------------------------------ |                        |                       
|                         |    <- API result / Flag for     |                        |                       
+-------------------------+    call flow control (Ex.       +------------------------+                       
                               route call to agent)                 |        |                               
```

The following CallStudio diagram is an example of a basic struture for bidirectional interaction:

![CVP General Diagram](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/blob/main/screenshots/cvp_01.PNG)

The following parameters of the "Voice Element - DialogFlow" block enable the invocation and variable sending to DialogFlow:
- Service Account ID: Name of the DialogFlow Agent
- Initiation Text: Any given text which matches the "Training Phrase" of an intent within the agent aforementioned
- Dialogflow.queryParams.payload: Any given value to be passed to DialogFlow (Ex. caller ANI, session variable from call flow, etc)

![CVP General Diagram](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/blob/main/screenshots/cvp_02.PNG)

# Giving control back to Cisco CVP

The "if" block attached to the DialogFlow block performs a polling on each turn in order to check which is the current intent.
It is possible to specify the name of a specific intent in order to know when it's time to return the call flow to CVP and work with the outcomes from DialogFlow.
The following Decision Editor statement polls for the intent named "my_return_intent". If the current turn matches it, the "if" statement breaks the loop and moves into the next block, passing the call control back to CVP:

```
If element data from element "df_01" and variable name "intent" equals (string) the string "my_return_intent", (action) then return (Exit State) OperationComplete
```

![CVP General Diagram](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/blob/main/screenshots/cvp_03.PNG)

IMPORTANT! The intent name is passed as low-caps always, regardless of the original name having upper-caps.

# Retrieving the data passed from DialogFlow in Cisco CVP

The exit state from the "if" block can be connected to an action block for retrieving the data passed from DialogFlow.
The following Java code aids in the retrieval of such data, contained in the parameter "myaction" (see the code repo for more information). Note that the contexts come in an array, therefore it is necessary to know the position of the context of interest. The default context is in the position [0]:

```
importPackage(com.audium.server.cvpUtil);
var  val= {Data.Element.df_01.json};
var path = "$.outputcontexts[0].parameters.myaction";
JSONPathUtil.eval( val, path);
```

The output can be subsequently connected to a "if" block for evaluation of the retrieved value in terms of call control. A use case is that, if the DialogFlow external operation was successful, the flag "end_call" is received, but if the opposite happened, the flag "transfer" is received.
The following Decision Editor statements performs the evaluation aforementioned:

![CVP General Diagram](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/blob/main/screenshots/cvp_04.PNG)

Finally, based on the exit state, the call flow can be routed to different subflows.

Another use case is the usage of this data directly for other purposes such as customer ID, etc.