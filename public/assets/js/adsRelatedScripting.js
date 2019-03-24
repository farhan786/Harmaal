var storage = firebase.storage();
var productName;
var database = firebase.database();
let userID = localStorage.getItem("userID");
var productkey;

function myFunction() {
  var userID=localStorage.getItem('userID'); 
  if(!userID){
    var element = document.getElementById("alerttxt");
    element.classList.remove("hidden");
  }
}

displayAds();
//DSIPLAY ADD
  function displayAds(){
    var grid = document.getElementById('row');
    var commentsRef = firebase.database().ref(`ads/`);
    commentsRef.on('child_added', function (data) {
   //   console.log(data.val());
        var row = generateBox(data.val(), data.key);
        grid.innerHTML += row;
    })
  }
//SEE DETAIL
  function seeDetails(key) {
    var userID = localStorage.getItem('userID');
    if(firebase.auth().currentUser.uid === userID)
    {
      localStorage.setItem('productKey',key);
      window.location.href = 'adsDetail.html';
    }
    else{
        myFunction();
    }
  
  }
//GENERATE PRODUCT BOX
  function generateBox(data, key) {
      return `<div class="col-sm-3" data-eventtype='${data.selectedInd}' style="background-color:white;margin: 2%;border: 7px #bcbabe solid;margin-left:4%;">
      <center>
      <img style='width: 100%;height: 290px;' src='${data.image}' alt='image' />
      <hr style='border: 1px solid black;' />
      <h4>Product Name: </h4><span style='font-size:20px;'> ${data.productName}</span>
      <h4>Price: </h4><strong style='font-size:20px;'>${data.Price} Rs</strong><br />
      <button onclick='seeDetails("${key}")' class='btn-lg productBtn'>View Detail</button>
      </center>
      <span class='date'><b>Publish Date: </b>${data.date}</span>
      </div>`
  }

//FILTER BY SEARCH
  function filterBySelect(){
    
    $( ".event-type-select" ).change(function() {
    var selectedEventType = this.options[this.selectedIndex].value;
      if (selectedEventType == "all") {
        $('.row div').removeClass('hidden');
      } else {
        $('.row div').addClass('hidden');
        $('.row div[data-eventtype="' + selectedEventType + '"]').removeClass('hidden');
      }
    });
  }

///////////////////////////////////////////////////
async function showFav(){
  if(navigator.onLine){
    
  var grid = document.getElementById('row');
  grid.innerHTML = '';
  firebase.database().ref("users/"+userID+"/MyFav").on("child_added",data=>{
   // console.log(data.val())
    grid.innerHTML += generateBox(data.val(), data.key);

  })
await fetch(`https://function-2a0fa.firebaseio.com/users/${userID}/MyFav.json`);
}else{
  
  grid.innerHTML = '';
  var feth = await fetch(`https://function-2a0fa.firebaseio.com/users/${userID}/MyFav.json`);
  var json = feth.json();
  for(var key in json){
    grid.innerHTML += (generateBox(json[key], key));
  }
}


}