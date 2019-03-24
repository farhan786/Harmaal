function signout(){
    var userid = localStorage.removeItem('userID');
    var signInButton = document.getElementById('sign-in');
    var signUpButton = document.getElementById('sign-up');
    var signOutButton = document.getElementById('sign-out');
    
    if(userid) {
     //   console.log(user);
        signInButton.setAttribute('hidden','true');
        signUpButton.setAttribute('hidden','true');
        signOutButton.removeAttribute('hidden');
    } else {
     //   console.log(user);
        signOutButton.setAttribute('hidden','true');
        signInButton.removeAttribute('hidden');
        signUpButton.removeAttribute('hidden');
    }
}
