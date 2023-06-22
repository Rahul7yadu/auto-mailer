const { google } = require('googleapis')
const express = require('express')
const app = express();
const creadentials = require('./credentials.json')
const  sendReplyEmails  = require('./sendReply')
const filterEmailThreads  =require('./filtereEmailThreads');
const listMessages  = require('./listMessage');
const  addLabelToEmails  =require('./addLabel');
// setting OAuth2
const oauth2Client = new google.auth.OAuth2(
    creadentials.web.client_id,
    creadentials.web.client_secret,
    creadentials.web.redirect_uris[0]
);
 const gmail = google.gmail({ version: 'v1', auth: oauth2Client });


// base route handler
app.get('/', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/gmail.modify'],
    });
    res.redirect(authUrl);
});



// router handler after auth
app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    console.log(code)
    const { tokens } = await oauth2Client.getToken(code);

    // setting the access token and refresh token
    oauth2Client.setCredentials({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        
        expiry_date: tokens.expiry_date,
    });

    res.send('Authorization successful! You can now close this window.');
    const checkAndReplyEmails = async()=>{

        const messages = await listMessages(gmail)
        
        
        const filteredThreads = await filterEmailThreads(messages,gmail)
        await addLabelToEmails(filteredThreads, gmail,'automail')
        await sendReplyEmails(filteredThreads,gmail)
    }
    const interval = Math.floor(Math.random() * (120000 - 45000 + 1)) + 45000;
    console.log(interval)
    setInterval(()=>checkAndReplyEmails().catch(err=>console.log(err)),interval)
});




// server running
app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});