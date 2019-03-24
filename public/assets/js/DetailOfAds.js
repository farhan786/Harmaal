var productName;
var database = firebase.database();
let userID = localStorage.getItem("userID");
let friendkey;
let friendName;
let userName;
var crrUser;
var postUser;
var productkey;

//GENERATE DETAIL 
generateDetails();
function generateDetails(){
  var d = document.getElementById('detailHTML');
  var productKey = localStorage.getItem("productKey");
  var commentsRef = firebase.database().ref(`ads/${productKey}`);
  commentsRef.on('value', function (data) {
      var row = gD(data,data.key);
  //    console.log(row);
      d.innerHTML +=row
  })
  
}
//GENERATE NAME OF USER
function naamkeahai(id,key){
    let userlist = firebase.database().ref(`users/${key}`);
    userlist.on('value', function(contact){
      var a = contact.val();
    //  console.log(a.firstname);
      document.getElementById(id).innerHTML += a.firstname +" "+a.lastname;
  });
  }
//GENREATE CONTACT NUMBER
  function numkeahai(key){
    let userlist = firebase.database().ref(`users/${key}`);
    userlist.on('value', function(contact){
      var a = contact.val();
    //  console.log(a.firstname);
      document.getElementById('name1').innerHTML = a.contact;
  });
  }

//GENERATE DETAIL
function gD(data, key) {
    return `<div class='container'>
    <center>
      <h1 class="subHeading">Product Name: ${data.val().productName}</h1>
    </center>
    <div class='container'>
    <img src='${data.val().image}' style='width:100%;float:left;height: 470px;display:inline;border: 7px solid black;' />
    </div>
    <div class='container' style="display:inline; white-space:nowrap;">
    <br />
    <table class='table table-hover'>
  
    <tr  class='hidden'>
    <td>Owner ID:</td>
    <td id='hiddenname'>${data.val().userID}</td>
    </tr>
    
    <tr>
    <td>Owner Name:</td>
    <td id='name2' onload='${naamkeahai('name2',data.val().userID)}'></td>
    </tr>
    <tr>
    <td>Phone:</td>
    <td id='name1' onload='${numkeahai(data.val().userID)}'></td>
    </tr>
    <tr>
    <td>Category</td>
    <td>${data.val().category}</td>
    </tr>
    <tr>
    <td>Year</td>
    <td>${data.val().year}</td>
    </tr>
    <tr>
    <td>Model</td>
    <td>${data.val().modelNumber}</td>
    </tr>
    <tr>
    <td>Price:</td>
    <td>${data.val().Price} PKR</td>
    </tr>
    <tr>
    <td>Ad Date:</td>
    <td>${data.val().date}</td>
    </tr>
    </table>
      <center><a href="JavaScript:void(0);" class="btn btn-primary btn-lg resp" id="fav_btn" onclick="addToFav('${key}');">
      <span class="glyphicon glyphicon-heart"></span> Add to favorite</a> 
      <a href="JavaScript:void(0);" class="btn btn-primary btn-lg resp" id="rebtn" onclick="RemoveFromFav('${key}');">
      <span class="glyphicon glyphicon-remove"></span> Remove from favorite</a> 
      <button id="myBtn" data-toggle="modal" data-target="#myModal" class='btn btn-primary btn-lg resp' onclick="chatBar('${data.val().userID}',naamkeahai('friendName','${data.val().userID}'));">Contact</button></center>
      </div>
      <br /><br /><br />
    </div>
    <br /><br /><br />
    <div>
      <center><h5 class="mainHeading">Description</h5></center>
      <p style='font-size: 19px;letter-spacing: 2px;word-spacing: 2px;text-align: center;'>${data.val().Description}</p>
    </div>
    <br /><br /><br />
    `;
  }
/////////////////////////////////////////////////CONTACT NUMBER/////////////////////////////////////////////////////////
let userlist = database.ref("users/");
userlist.on('child_added', function (data) {
  var datalist = data.val();
  //console.log(data.val());
  if (userID == datalist.userID) {
      userName = datalist.firstname;
  }
});
///////////////////////////////////ADD TO FAVORITE//////////////////////////////////////////////
async function addToFav(key){


  firebase.database().ref("ads/").on('child_added', snap =>{
    if(key == snap.key){
      firebase.database().ref("users/"+userID+"/MyFav/"+key).set(snap.val())
    }

  })
  await fetch(`https://function-2a0fa.firebaseio.com/users/${userID}/MyFav.json`);
}

/////////////////////////////////////////////////REMOVE TO FAVORITE/////////////////////////////////////////////////////////////
 function RemoveFromFav(key){


  firebase.database().ref("ads/").on('child_added', snap =>{
    if(key == snap.key){
      firebase.database().ref("users/"+userID+"/MyFav/"+key).set(null)
    }

  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
  function chatBar(userId,userInfo) {
  crrUser = firebase.auth().currentUser.uid;
  if (crrUser === null) {
  window.location.href = 'signin.html'
  }
  
  document.getElementById("chatdiv").style.display = "block"
  var d = document.getElementById('chatdiv');
  postUser = userId;
  d.innerHTML = `<div class="chat_window">
  <div class="top_menu" style='height: 59px;'>
  <div id="title" class="buttons">
  <div class="button close" onclick="off()">x</div>
  </div>
  <div class="title" id="friendName"></div>
  </div>
  <ul id="conversationArea" class="messages">

  </ul>
  <div class="bottom_wrapper clearfix">
  <div class="message_input_wrapper">
  <input id="message" class="message_input" placeholder="Type your message here.." />
  </div>
  <div class="send_message" onclick="sentMsg()" >
  <div class="icon"></div>
  <div class="text">Send</div>
  </div>
  </div>
  </div>`
  showChat(postUser, userInfo);
  }
//SHOW CHAT

  function showChat(userId, userInfo) {
    document.getElementById("conversationArea").innerHTML = "";
    friendName = userInfo;
    productkey = localStorage.getItem('productKey');
    friendkey = userId;
    document.getElementById("chatdiv").style.display = "block";

    document.getElementById("chatdiv").style.position = "fixed";

    var chatmsg = database.ref(`conversation/${productkey}/${userID}/${postUser}`);
    chatmsg.on('child_added', function (data) {
        var userinfo = data.val();
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

///////////////////////////////////SEND MESSAGES//////////////////////////////////////////////////////////////
  function sentMsg() {
    if(document.getElementById("message").value == ""){
      alert("Write Some Thing");
      return false;
  }
  crrUser = localStorage.getItem('userID');
  productkey = localStorage.getItem('productKey');
  let msg = document.getElementById("message").value;
  document.getElementById("message").value = "";
 // console.log(friendkey);
  let notify = firebase.database().ref(`notification/`).push();
  notify.set({
    messages:msg,
    from:crrUser,
    to: postUser,
    time:(new Date()).toLocaleDateString()
  });
  let chatSeen = firebase.database().ref(`message/${productkey}/${userID}/${postUser}`);

  chatSeen.set({
  //   userName: userName,
      message: msg,
      from: crrUser,
      time: (new Date()).toLocaleTimeString()

  });
  let chatFriendSeen = firebase.database().ref(`message/${productkey}/${postUser}/${userID}`);
  chatFriendSeen.set({
    //  userName: userName,
      message: msg,
      from: crrUser,
      time: (new Date()).toLocaleTimeString()

  });
  let chat = firebase.database().ref(`conversation/${productkey}/${userID}/${postUser}`).push();
  chat.set({
  //   userName: userName,
      message: msg,
      from: crrUser,
      time: (new Date()).toLocaleTimeString()

  });
  let chatFriend = firebase.database().ref(`conversation/${productkey}/${postUser}/${userID}`).push();
  chatFriend.set({
    //  userName: userName,
      message: msg,
      from: crrUser,
      time: (new Date()).toLocaleTimeString()

  });
}
  function off() {
    
    document.getElementById("conversationArea").innerHTML = "";
    document.getElementById("chatdiv").style.display = "none"


  }
