//Redirect from signup to signin...
var database = firebase.database();

function cancel() {
    window.location.assign("signin.html");
}

//signup you in database
function signup(){
    var form = new FormData(document.querySelector('form'));
    var userlist = {
        date: (new Date()).toDateString(),
        address:form.get('address'),
        contact:form.get('contact'),
        password:form.get('password'),
        email:form.get('username'),
        lastname:form.get('lname'),
        firstname:form.get('fname')
    };
    firebase.auth().createUserWithEmailAndPassword(form.get('username'), form.get('password'))
    .then(success => {
       userlist = database.ref(`users/${success.user.uid}`).set(userlist);
        document.querySelector('form').reset();
        localStorage.setItem('userID',success.user.uid);
        alert("Your Account has been created!!!");
        window.location.href = "index.html";
        return false;
    })
    .catch(error => {
        var err = error.code;
        // console.log(success.code);
        // console.log(success.message);
    });
    return false;

}

//signin the userr and redirect to index.html (by default)
 function signin(){
    var form = new FormData(document.querySelector('form'));
    firebase.auth().signInWithEmailAndPassword(form.get('username'), form.get('password'))
      .then(async success => {
            var user_id = success.user.uid;
            localStorage.setItem('userID',user_id);
            var mob = firebase.database().ref(`users/${user_id}`);
            mob.on('value',function(contact){
                var cont = contact.val();
                localStorage.setItem('mobile',cont.contact);
            })
            window.location.href = "index.html"; 
            await fetch(`https://function-2a0fa.firebaseio.com/users/${userID}/MyFav.json`);
            
      })
      .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
      });
      return false;
}
function backAway(){
    //if it was the first page
    if(history.length === 1){
        window.location.href = "index.html"
    } else {
        history.back();
    }
}

