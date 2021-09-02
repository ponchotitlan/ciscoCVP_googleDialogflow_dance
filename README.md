# ciscoCVP_googleDialogflow_dance

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/ponchotitlan/ciscoCVP_googleDialogflow_dance)

Google Dialogflow is a powerful technology for creating AI-driven conversational experiences. The usage of it along with Cisco Customer Voice Portal (CVP) and customer’s data sources is the perfect recipe for next-generation voice menus. However, out-of-the-box DialogFlow is very limited in terms of business logic. Nonetheless, these capabilities can be expanded with the power of code.

This repo consists on a *middleware boilerplate* based on NodeJS and Express for enabling the interaction between DialogFlow and Cisco CVP **in a modular, plug-n-play fashion** for the individual intents of the DialogFlow agent. The middleware contemplates the following use cases:

- Receiving POST requests from a DialogFlow agent with basic authentication
- Extracting entities from a DialogFlow incoming request
- Passing parameters between Cisco CVP and Dialogflow
- Triggering events in the target DialogFlow agent

# Motivation

The usage of this Middleware with DialogFlow allows the IVR designer to **decouple the data logic from the call routing**. That is, it is possible to handle the input parameters, query sources (databases, APIs, etc) and data processing apart from the route that the call will follow (agent queues, CVP applications, etc). 

Think of the following scenario:

![Architecture Diagram with CVP](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/blob/main/screenshots/arch_01.jpg)

*Agent icon designed by [freepik.es](https://www.flaticon.es/)*

The telephony part of the architecture is agnostic to the logic on the DialogFlow side. The single CVP application is invoked, and it triggers all the conversational experience and data handling on the side of DialogFlow and this Middleware.

Moreover, the design of this middleware enables a plug-n-play operation, in which every interaction is an independent NodeJS script mapped to an individual intent within the DialogFlow agent:

![Middleware Architecture Diagram](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/blob/main/screenshots/arch_02.jpg)

*JS script icon designed by [freepik.es](https://www.flaticon.es/)*

# Example use cases

- **Send information from CVP to DialogFlow for API-related operations**: CVP has knowledge of PSTN-related data such as DNIS, ANI, Incoming number, etc. DialogFlow doesn't know this information as it is decoupled from the PSTN world! This data can be useful for scenarios such as customer-related services, authentication, etc.

- **Send information from DialogFlow to CVP for choice taking and generic data**: DialogFlow can gather data from the user's input, as well as APIs and 3rd Party services. For example, after authenticating a user with input data (name, address, etc) through an API call, the gathered user ID can be passed back to CVP for further call flow.

- **Application granularity**: Specific use cases for the IVR (User authentication, Robo-booking, etc) can be designed entirely in DialogFlow and this middleware (conversational layer and API/3rd-party querying) and plugged to the call routing via CVP/VVB.

# Setting up Google Dialogflow

For creating a DialogFlow agent and intents, read the [Dialogflow ES basics guide](https://cloud.google.com/dialogflow/es/docs/basics).

The biolerplate communicates with Dialogflow via Webhooks. For enabling this service in the Fulfillment zone of your agent, read the [Webhooks guide](https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook?hl=es-419).

# Setting up Cisco CVP Customer Virtual Assistant (CVA)

For setting up your environment for communication between Cisco CVP Customer Virtual Assistant (CVA) and Google DialogFlow, read the [Official Article created by Cisco engineers](https://www.cisco.com/c/en/us/support/docs/contact-center/unified-customer-voice-portal/215527-configure-cvp-customer-virtual-assistant.html) 

This boilerplate can be useful in any of the architectures mentioned, as its main purpose is to enable the passing of parameters between both platforms, so that Google Dialogflow can provide the ASR conversational layer, and Cisco CVP perform the call flow and routing.

Check the "modules" folder for more information regarding Cisco Call Studio configuration for information exchange with Google Dialogflow.

# Middleware environment setup

Clone the contents of this repository in your environment:
```
git clone https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance.git
```

Install the libraries required for this repository by executing the following command in the same directory where the *package.json* file is located:
```
npm install
```

A custom module called *config.js* is provided in the project for specifying global parameters such as listening port, API addresses, DialogFlow credentials and more. It is necessary to fill the placeholders in order to prepare the server:
```
    //BASIC AUTHENTICATION USERNAME:PASSWORD FOR DIALOGFLOW WEBHOOK
    DIALOGFLOW_USERNAME: '<your_dialogflow_fulfillment_username>',
    DIALOGFLOW_PASSWORD: '<your_dialogflow_fulfillment_password>',

    //WEB SERVER PARAMETERS
    SERVER_PORT: '<your_web_server_listening_port>',

    //API OR DATA SOURCE ADDRESSES
    DATA_SOURCE_ADDRESS_1: '<your_datasource_address_1>',
    DATA_SOURCE_ADDRESS_2: '<your_datasource_address_2>',
    DATA_SOURCE_ADDRESS_3: '<your_datasource_address_3>'
    . . .
```

This repo is intended as a boilerplate, hence all code samples have placeholders which need to be updated according to the specific application needs:

- **auth.js**: Basic Base64 authentication module
- **handler.js**: Interaction handler between DialogFlow and custom modules
- **intent-handlers/my_intent.js**:  Module with logic for handling specific DialogFlow intent interaction with Cisco CVP and 3rd party data sources

**The details are mentioned in the content of each file and in [this README](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/tree/main/modules/intent-handlers):**

# Middleware Web Server Running

The web server engine is Express, which is based on NodeJS. In order to execute the server, the following command is required in the same location as the project root:

```
node index.js
```

Communication from this Web Server with DialogFlow can be established via a test tunnel service such as [ngrok](https://ngrok.com/) or with a formal proxy. The address must be setup in the *Fulfillment* page of the DialogFlow portal.

# Cisco CVP setup

The details for CVP app setup via CallStudio are explained in [this repo's Wiki entry](https://github.com/ponchotitlan/ciscoCVP_googleDialogflow_dance/wiki/%F0%9F%91%A9%E2%80%8D%F0%9F%9A%80-Setting-up-the-interaction-between-Cisco-CVP-and-Google-DialogFlow).

Crafted with :heart: by [Alfonso Sandoval - Cisco](https://linkedin.com/in/asandovalros)