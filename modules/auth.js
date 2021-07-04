/**
 * 
 * auth.js
 * Basic authentication module for incoming HTTP requests
 * Author: Alfonso Sandoval
 * 
 */

const config = require('../config');
module.exports = (req, res, next) => {
/**
 * 
 * Google DialogFlow headers send the Basic Authentication encoded with Base64 with the format "username:password".
 * This module performs a very basic credentials assembly and validation.
 * If the credentials do not match those specified in the "config" module, or the webhook request is not authenticated, a 403 or 401 status is sent to DialogFlow, triggering the corresponding fallback intent within the agent.
 * 
 */
  try {
    let local_token = config.DIALOGFLOW_USERNAME.concat(":").concat(config.DIALOGFLOW_PASSWORD);
    let incoming_token = req.headers.authorization.split(' ')[1];
    let buffered_token = Buffer.from(incoming_token, 'base64');
    let text_token = buffered_token.toString('ascii');
    if (text_token != local_token) {
      res.status(403).json({
        error: new Error('Invalid username or password')
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};