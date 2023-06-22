


 const filterEmailThreads = async(messages,gmail)=> {
    const filteredThreads = [];
    for (const message of messages) {
        const threadId = message.threadId;
        
        const threadRes = await gmail.users.threads.get({ userId: 'me', id: threadId });
        const thread = threadRes.data;
        
        
        const profileRes = await gmail.users.getProfile({ userId: 'me' });
        const emailAddress = profileRes.data.emailAddress;
        
        const hasPrev = hasPreviousConversation(thread,emailAddress)
        if(!hasPrev){
            filteredThreads.push(thread)
        }
    }

    return filteredThreads;
}

function hasPreviousConversation(thread,email) {
    const messages = thread.messages;
    
    if(messages.length>1) return true
    else return false
    
  }

  module.exports = filterEmailThreads