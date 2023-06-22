

const   addLabelToEmails=async (threads, gmail,labelName) =>{
    let labelId

    try {
        const prevLabelsRes = await gmail.users.labels.list({ userId: 'me' })
        const lables = prevLabelsRes.data.labels
        const existingLable = lables.find(lable => lable.name === labelName)
        console.log("existing lables",existingLable)


        if (existingLable) {
            labelId = existingLable.id
        } else {
            try{
    
                const labelRes = await gmail.users.labels.create({ userId: 'me', resource: { name: labelName } });
                labelId = labelRes.data.id;
            }catch(error){
                console.log("error creating label",error)
            }
        }

    } catch (error) {
        console.log(error)
    }

   
    for (const thread of threads) {
        try {
            const messageIds = thread.messages.map(message => message.id);
      
            for(let messageId of messageIds){

                const res = await gmail.users.messages.modify({ userId: 'me', id: messageId, addLabelIds: [labelId] });
                
            }
        } catch (error) {
            console.log("error transering the message to labels",error)
        }
       
    }
}

module.exports = addLabelToEmails