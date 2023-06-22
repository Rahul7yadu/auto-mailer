
const { EmailMessage } = require('googleapis')

const sendReplyEmails = async (threads, gmail) => {

    for (const thread of threads) {
        const { fromAddress, toAddress } = getEmailAddresses(thread)
        console.log("email addressess", fromAddress, toAddress)
        const replyContent = `From: "Rahul Yadu" <${fromAddress}>
To: ${toAddress}
Subject: Testing

this was replied by automail created by rahul yadu.
`;
        const messageIds = thread.messages.map(message => message.id)[0];


        const encodedReplyContent = Buffer.from(replyContent).toString('base64');

        const reply = {
            id: messageIds,
            userId: 'me',
            resource: {
                raw: encodedReplyContent,
                threadId: thread.id,
            },
        };
        try {
            
            const resp = await gmail.users.messages.send({ requestBody: { raw: encodedReplyContent, id: messageIds, threadId: thread.id }, userId: 'me', toAddress: 'motathor1729@gmail.com' });
            console.log(resp)
        } catch (error) {
            throw new Error(error)
        }
    }
}


function getEmailAddresses(thread) {
    const firstMessage = thread.messages[0]
    const headers = firstMessage.payload.headers;


    const fromHeader = headers.find(header => header.name.toLowerCase() === 'from');
    const fromAddress = fromHeader.value;


    const toHeader = headers.find(header => header.name.toLowerCase() === 'to');
    const toAddress = toHeader.value;

    return { fromAddress, toAddress };
}

module.exports = sendReplyEmails