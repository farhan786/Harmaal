var storage = firebase.storage();
var database = firebase.database();
let userID = localStorage.getItem("userID");
var productkey;

//Store Images
  function storeImage(){
      var fileButton = document.querySelector("#file").files[0];
      var e = document.getElementById("Adscategory");
      var dspText = e.options[e.selectedIndex].text;
      var dspVal = e.options[e.selectedIndex].value;
      //console.log(dspVal);
      const name = (+new Date()) + '-' + fileButton.name;
      const metadata = { contentType: fileButton.type };
    
      var fileRef = storage.ref("Images/"+name);

      fileRef.put(fileButton,metadata)
      .then(snapshot => {
          return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL=>{
        
          //console.log(`Successfully downloaded${downloadURL}`)
          var imageURL = downloadURL;
          productName = document.getElementById('pname').value;
          var modelNumber = document.getElementById('mname').value;
          var year = document.getElementById('year').value;
          var Price = document.getElementById('price').value;
          var Description = document.getElementById('address').value;

          var userID=localStorage.getItem('userID'); 
          var mobile=localStorage.getItem('mobile');
          
          if(firebase.auth().currentUser.uid === userID){
            var data = firebase.database().ref(`ads/`).push();
            
            data.set({
                productName:productName,
                Description:Description,
                year : year,
                category: dspText,
                selectedInd: dspVal,
                Price : Price,
                image:imageURL,
                modelNumber:modelNumber,
                mobile:mobile,
                userID:userID,
                date: (new Date()).toDateString(),

            });
            firebase.database().ref('notification/').push().set({
              title:productName,
              Description:Description,
              year : year,
              category: dspText,
              Price : Price,
              image:imageURL,
              date: (new Date()).toDateString(),

            });
          }
        else{
          myFunction();
        }
        alert("Your ad has been submitted!!!")
        document.querySelector('#formOfAds').reset();
        return false;
      })
      
    .catch(console.error);

  }
//AUTHENTICATION
  function myFunction() {
    var userID=localStorage.getItem('userID'); 
    if(!userID){
      var element = document.getElementById("alerttxt");
      element.classList.remove("hidden");
    }
  }
//Back Button
  function backAway(){
    //if it was the first page
    if(history.length === 1){
        window.location.href = "index.html"
    } else {
        history.back();
    }
}
