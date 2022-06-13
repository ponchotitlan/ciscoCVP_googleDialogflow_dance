## Sample resources

This location contains the following resources for helping you getting started with an integral CC application using Cisco CVP, Google Dialogflow and this NodeJS middleware:

### DialogFlow ES agent example
The location _dialog_agent_ contains a zip file with the export of an agent designed under the guidelines described in the wiki of this repository. The use case contemplates the authentication of a user through a questionnaire, and an optional account update with the ANI of the caller.

### CallStudio project example
The location _cvp_vxml_app_ contains the export of a CallStudio project for a Cloud-based IVR. All call control is delegated to DialogFlow. The call control returns to CC only when specific intents are matched, after which the variables from a specific DiaglofFlow context are extracted from the JSON payload.