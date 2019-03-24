//Initialization
const FIREBASE_AUTH = firebase.auth();
const FIREBASE_MESSAGING = firebase.messaging();
const FIREBASE_DATABASE = firebase.database();

//Getting the userID from local storage
var USERID = localStorage.getItem('userID');
var notification = localStorage.getItem('notification');

if(USERID){
    var userRef = FIREBASE_DATABASE.ref(`users/${USERID}`);
    userRef.on("value",function (success){
        var userlist = success.val();
    });
    if(notification !== true){
        FIREBASE_MESSAGING.requestPermission()
    .then(() => handleTokenRefresh())
    .catch((error) => console.log(error));
    
        function handleTokenRefresh(){
            return FIREBASE_MESSAGING.getToken()
            .then(token => {
            //   console.log(token);
                FIREBASE_DATABASE.ref(`tokens/${USERID}`).set({
                    token:token,
                    UserID:USERID
                });
                localStorage.setItem('notification',JSON.stringify(true));
            })
        }
    }
}