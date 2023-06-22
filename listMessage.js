


 const listMessages = async(gmail)=> {
    try {
        const res = await gmail.users.messages.list({ userId: 'me', maxResults: 5 });
        const messages = res.data.messages;
        console.log('Messages:', messages);
        return messages
    } catch (error) {
        console.error('Error listing messages:', error);
    }

}

module.exports = listMessages