var database = firebase.database();
let userID = localStorage.getItem("userID");
let friendkey;
let friendName;
let userName;
let postUser;
let productkey = localStorage.getItem('productKey');
let userlist = database.ref(`conversation/${productkey}/${userID}`);

userlist.on('child_added', function (data) {
    var datalist = data.val();
    if (userID == datalist.userID) {
        userName = datalist.key;
    }
    if (datalist.userID != userID) {
        let row = generateRow(data.key);
    }
});
    function generateRow(key) {
    let userlist = firebase.database().ref(`users/${key}`);
    userlist.on('value', function (contact) {
        var a = contact.val();
      //  console.log(a.firstname);
        document.getElementById("userlist").innerHTML +=`<a href="JavaScript:void(0)"  class="list-group-item list-group-item-action sendername" onclick="showChat('${key}',this)">${a.firstname}</a>`
    })
}


function sentmsg() {
    if(document.getElementById("message").value == ""){
        alert("Write Some Thing");
        return false;
    }
    let msg = document.getElementById("message").value;
    document.getElementById("message").value = "";
  //  console.log(friendkey);
    let notify = firebase.database().ref(`notification/`).push();
notify.set({
        messages:msg,
        from:userID,
  to: friendkey,
  time:(new Date()).toLocaleDateString()
});
    let chatSeen = firebase.database().ref(`message/${productkey}/${userID}/${friendkey}`);
    chatSeen.set({
        //userName: userName,
        message: msg,
        from: userID,
        time: (new Date()).toLocaleTimeString()

    });
    let chatFriendSeen = firebase.database().ref(`message/${productkey}/${friendkey}/${userID}`);
    chatFriendSeen.set({
        //userName: userName,
        message: msg,
        from: userID,
        time: (new Date()).toLocaleTimeString()

    });
    let chat = database.ref(`conversation/${productkey}/${userID}/${friendkey}`).push();
    chat.set({
        //userName: userName,
        message: msg,
        from: userID,
        time: (new Date()).toLocaleTimeString()

    });
    let chatFriend = database.ref(`conversation/${productkey}/${friendkey}/${userID}`).push();
    chatFriend.set({
       // userName: userName,
        message: msg,
        from: userID,
        time: (new Date()).toLocaleTimeString()

    });
}
function showChat(friendId, friendInfo) {
    document.getElementById("conversationArea").innerHTML = "";
    friendName = friendInfo.innerHTML;
  //  console.log(friendName);
    friendkey = friendId;
    //console.log(friendkey);
    document.getElementById("chatdiv").style.display = "block"
    document.getElementById("maindiv").style.opacity = ".3"
    document.getElementById("friendName").innerHTML = friendName;

    var chatmsg = database.ref(`conversation/${productkey}/${userID}/${friendkey}`);

    chatmsg.on('child_added', function (data) {
        var userinfo = data.val();
       // console.log(data.val());
        if (userinfo.from == userID) {
            document.getElementById("conversationArea").innerHTML += `<li class="message right appeared">
            <div class="text_wrapper">
            <div class="text">${userinfo.message}</div>
            </div>
            </li>`
        }
        else{
            document.getElementById("conversationArea").innerHTML += `<li class="message left appeared">
            <div class="text_wrapper">
            <div class="text">${userinfo.message}</div>
            </div>
            </li>`

        }
    });





}

function off() {
    document.getElementById("conversationArea").innerHTML = "";
    document.getElementById("chatdiv").style.display = "none"
    document.getElementById("maindiv").style.opacity = "1"

}