const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers");
const { ChatMessages } = require('../models');

const chatMessages = new ChatMessages();

const socketController = async( socket = new Socket, io ) => {
    
    const user = await checkJWT(socket.handshake.headers['authorization']);

    if( !user ) return socket.disconnect();

    chatMessages.connectUser( user );
    io.emit( 'users-active', chatMessages.usersArr );
    socket.emit( 'get-messages', chatMessages.lastTens );


    socket.join( user.id );


    // Clear on disconnect
    socket.on('disconnect', () => {
        chatMessages.disconnectUser( user._id );
        io.emit( 'users-active', chatMessages.usersArr );
    })

    socket.on('send-message', ({ uid, message }) => {
        
        if(uid){
            // Private
            socket.to( uid ).emit( 'get-private', { from: user.name, message: message } );
        }else{
            // Public
            chatMessages.sendMessage( user.uid, user.name, message );
            io.emit('get-messages', chatMessages.lastTens);
        }


    })

}

module.exports = {
    socketController
}