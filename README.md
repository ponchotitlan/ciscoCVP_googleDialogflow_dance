# ciscoCVP_googleDialogflow_dance
Google Dialogflow is a groundbreaking technology for delivering ASR conversational experiences within the customer interaction. Instead of the ol'reilable DTMF after "Press 1 for Tech Support, press 2 for sales, or wait in the line for an agent ...", an IVR can ask "How can I help you?", and then enable the user to say "My internet is not working!" so that the call is routed to the best flow option. Moreover, the Google DialogFlow platform can deliver TTS with a wide variety of top-notch voices using the Wavenet technology.

Cisco Contact Center solutions can benefit from this platform in order to deliver next-gen IVR experiences for all verticals.

This repo consists on a very basic web server boilerplate based on NodeJS and Express for exploring the interaction between Google and Cisco. The web server contemplates the following use cases:

- Receiving POST requests from a DialogFlow agent with basic authentication
- Extracting entities from an incoming request
- Passing parameters between Cisco CVP and Dialogflow
- Triggering events in the target DialogFlow agent

```                                                                                       
+-------------------------+                                 +------------------------+                       
|                         | Call flow variable (ID, etc) -> |                        |                       
|                         |  ------------------------------ |                        |                       
|        Cisco CVP        |                                 |    Google DialogFlow   |                       
|                         |  ------------------------------ |                        |                       
|                         |    <- API result / Flag for     |                        |                       
+-------------------------+    call flow control (Ex.       +------------------------+                       
                               route call to agent)                 |        |                               
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
                                                                                  +------------
```

# Setting up Google Dialogflow

For creating a DialogFlow agent and intents, read the [Dialogflow ES basics guide](https://cloud.google.com/dialogflow/es/docs/basics).

The biolerplate communicates with Dialogflow via Webhooks. For enabling this service in the Fulfillment zone of your agent, read the [Webhooks guide](https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook?hl=es-419).

Communication from this Web Server with DialogFlow can be established via a test tunnel service such as [ngrok](https://ngrok.com/) or with a formal proxy.

# Setting up Cisco CVP Customer Virtual Assistant (CVA)

For setting up your environment for communication between Cisco CVP Customer Virtual Assistant (CVA) and Google DialogFlow, read the [Official Article created by Cisco engineers](https://www.cisco.com/c/en/us/support/docs/contact-center/unified-customer-voice-portal/215527-configure-cvp-customer-virtual-assistant.html) 

This boilerplate can be useful in any of the architectures mentioned, as its main purpose is to enable the passing of parameters between both platforms, so that Google Dialogflow can provide the ASR conversational layer, and Cisco CVP perform the call flow and routing.

Check the "modules" folder for more information regarding Cisco Call Studio configuration for information exchange with Google Dialogflow.

Crafted with :heart: by [Alfonso Sandoval - Ponchotitlán](https://linkedin.com/in/asandovalros)