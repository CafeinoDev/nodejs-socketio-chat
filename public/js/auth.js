const url = `${ window.location.href }api/auth`;

const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {  }

    for(let el of loginForm.elements ){
        if( el.name.length > 0 )
            formData[el.name] = el.value;
    }

    fetch( url + '/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    } ).then(
        resp => resp.json()
    ).then( ({ msg, token }) => {
        if( msg ) return console.error(msg);

        localStorage.setItem('token', token);
        window.location = 'chat.html';

    }).catch( err => console.log(err));
})


function handleCredentialResponse(response) {
    let data = { id_token: response.credential };

    fetch( url + '/google', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then( resp => resp.json() )
    .then( ({ token }) =>{
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( console.log );
}


window.onload = function () {
  google.accounts.id.initialize({
    client_id: "1095408186316-aitrmboodl58qporkoqecmselopq2e14.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
}