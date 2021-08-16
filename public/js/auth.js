 const form = document.getElementById('form');  
     
let url = (window.location.host.includes('localhost'))
          ? `http://localhost:8080/api/auth/`
          : `https://restserver--inicial.herokuapp.com/api/auth/`


// obtengo el id token de google del usuario para mandarlo al backend 
        function onSignIn(googleUser) {
        // var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            var data = {id_token}

           fetch(url + 'google',{
               body: JSON.stringify(data),
               headers: {'Content-Type': 'application/json'},
               method:'POST'
           })
           .then(response => response.json()).then(({token})=>{ 
             localStorage.setItem('token',token);
             window.location ='chat.html'
            
            })
             .catch(e=>console.log)
          
           

      
          

    

   

}

function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });

  }

// login manual authentication

form.addEventListener('submit',  (event)=>{
// evito el refresh del navegador
  event.preventDefault();

  const formData = {}


  // con este metodo obtengo de una manera mas rapida y sencilla el contenido de los form
  for(let elem of form.elements){
    if(elem.name.length > 0){
      formData[elem.name] = elem.value
    }
  }

  
  fetch(url + 'login', {
    method: 'POST',
    headers: {"Content-Type" : "application/json"} ,
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(({token,msg}) => {
      if(msg){
        return console.error(msg)
      }
        localStorage.setItem('token',token)
        window.location ='chat.html'
      
    } )
    .catch((e) => console.log(e));
  
  
})