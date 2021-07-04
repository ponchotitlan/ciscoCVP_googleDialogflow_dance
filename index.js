/**
 * 
 * index.js
 * ExpressJS Web Server for main HTTPS POST dispatch
 * Author: Alfonso Sandoval
 * 
 */

//Express Web Server library
const express = require('express');
//Custom module for configuration variables
const config = require('./config')
//Custom module for basic Base64 authentication
const auth = require('./modules/auth');
//Custom module for logic handling between this Web Server, DialogFlow and Cisco CVP
const handler = require('./modules/handler')

//Express Web server instance
const app = express();

/**
 * 
 * This is the main point of entry for the web server
 * All incoming requests from DialogFlow will be dispatched by the "gateway" module
 * IMPORTANT! Remember to put the correct route in the Fulfillment part of your agent
 * In this case, it would be https://<my_public_IP_or_DNS>/webhook
 * 
 * This is also an authenticated requests-only route
 * The "auth" module is setup for basic Base64 authentication
 * If using this module, remember to setup your credentials in the Fulfillment part of your agent
 * 
 * This is a very basic Express web server. For exploration and demo purposes only!
 * 
 */
app.post('/webhook', auth, express.json(), function (req, res) {
  handler(req, res);
})

/**
 * 
 * Express Web server initialization
 * It is necessary to specify the port where the web server will be listening in the "config" module
 * 
 */
app.listen(config.SERVER_PORT, () => {
  console.log('Web Server up and running!');
})