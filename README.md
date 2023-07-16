# Auto-mailer
## A back-end nodejs application which categorises incomming emails which has not been replied by you to a new label and send predefined reply to the sender.
## scans your emails from random range of 45 to 120 seconds.
### Nodejs, expressjs, googleApis

## working
1. authenticate with your google account.
1. let it access your gmail
2. scans your email between random intervals of 45 to 120 seconds
3. it will categorise your unreplied emails to a label
4. it will send custom predefined email to the sender

## Requirement
1. ### requires google account , create a project in google cloud and enable Oauth2 .
1. ### get the api keys, and store it in credential.json file or .env file of root directory
1. ### nodejs

## Usage
1. clone the repository
2. configure your google Oauth2 Api
3. run ```npm install``` to install all dependencies
1. run ```npm run dev```
2. opens a new browser window and asks to authenticate with your google account
3. give permission to access your gmail
4. app should be running in random interval between 45 to 120 seconds


  
