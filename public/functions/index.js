
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendNotifications = functions.database.ref('notification/{notificationId}').onCreate((event) => {
  const NOTIFICATION_SNAPSHOT = event.data;
    if(NOTIFICATION_SNAPSHOT.to == undefined){
    const payload = {
        notification: {
            title: `Get ${NOTIFICATION_SNAPSHOT.val().user}!`,
            body: NOTIFICATION_SNAPSHOT.val().Description,
            icon: NOTIFICATION_SNAPSHOT.val().image,
            click_action: `https://function-2a0fa.firebaseio.com/`
        }
  }

  return admin.database().ref('tokens/').once('value').then((data) => {
    
    if ( !data.val() ) return;

    const snapshot = data.val();
    const tokensWithKey = [];
    const tokens = [];

    for (let key in snapshot) {
      tokens.push( snapshot[key].token );
      tokensWithKey.push({
        token: snapshot[key].token,
        key: key
      });
    }
//console.log(tokens);
    return admin.messaging().sendToDevice(tokens, payload);
});
}
else{
    var imageURL='';
    const payload = {
        title:`New Message from ${NOTIFICATION_SNAPSHOT.userID}!`,
        body:NOTIFICATION_SNAPSHOT.Description,
        click_action:'https://function-2a0fa.firebaseio.com/'
    }
    return admin.database().ref(`tokens/${NOTIFICATION_SNAPSHOT.to}`).once('value').then((data) => {
    
        if ( !data.val() ) return;
    
        const snapshot = data.val();
        const tokens = [];
    
          tokens.push( snapshot.token );
        return admin.messaging().sendToDevice(tokens, payload);
    
})
}
});