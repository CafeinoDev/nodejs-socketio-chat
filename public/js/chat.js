// Html Refs
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnLogout = document.querySelector('#btnLogout');


const url = `http://localhost:8080/api/auth/`;
let user   = null;
let socket = null;

const validateJWT = async() => {
    const token = localStorage.getItem('token') || '';

    if( token.length <= 10 ){
        window.location = '/';
        throw new Error('No token on server');
    }

    const resp = await fetch( url, {
        headers: {
            'Authorization': token
        }
    })

    const { user: userDb, token: tokenDb } = await resp.json();

    console.log(userDb, tokenDb);
    localStorage.setItem('token', tokenDb);
    user = userDb;
    document.title = user.name;

    await connectSocket();
}

const connectSocket = async() => {
    socket = io({
        'extraHeaders': {
            'Authorization': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets online');
    })

    socket.on('disconnect', () => {
        console.log('Sockets offline');
    })

    socket.on('get-messages', drawMessages );

    socket.on('users-active', drawUsers );

    socket.on('get-private', (payload) => {
        console.log('Private message: ', payload);
    })
}

const drawUsers = ( users = []) => {
    let usersHtml = '';
    
    users.forEach( ({ name, uid }) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${ name }</h5>
                    <span>${ uid }</span> 
                </p>
            </li>
        `;
    });

    ulUsers.innerHTML = usersHtml;
}


const drawMessages = ( messages = []) => {
    let usersMessages = '';
    
    messages.forEach( ({ name, message }) => {
        usersMessages += `
            <li>
                <p>
                    <span class="text-primary">${ name }: </span>
                    <span>${ message }</span> 
                </p>
            </li>
        `;
    });

    ulMessages.innerHTML = usersMessages;
}


txtMessage.addEventListener('keyup', ({ keyCode }) => {
    const message = txtMessage.value;
    const uid     = txtUid.value;

    if( keyCode !== 13 || message.length === 0 ){ return; }

    socket.emit('send-message', { message, uid });
    txtMessage.value = '';


})


const main = async() => {
    await validateJWT();
}

main();

// const socket = io();