var userID = localStorage.getItem('userID');

displayUserAds();
function displayUserAds(){
  var table = document.querySelector('tbody');
  var commentsRef = firebase.database().ref('ads/');
  commentsRef.on('child_added', function (data) {
  if(userID){
    table.innerHTML +=  generateRow(data.val(), data.key);
  }
  else{
    myFunction();
  }

  })
}
function myFunction() {
  if(!userID){
    var element = document.getElementById("alerttxt");
    element.classList.remove("hidden");
  }
}
function generateRow(data, key) {

    return `<tr>
    <td>${data.productName}</td>
    <td>${data.date}</td>
    <td>${data.Price} PKR</td>
    <td><button class='btn btn-primary' onclick="seeDetails('${key}')" style="width:auto;"> MESSAGES</button></td>
    <td><button class='btn btn-success' onclick="addPopup('${key}')" style="width:auto;"> UPDATE</button></td>
    <td><button class='btn btn-danger' onclick="deleteRow('${key}',this)" style="width:auto;"> DELETE</button></td>
  </tr>`
}
function seeDetails(key) {
  var userID = localStorage.getItem('userID');
  if(firebase.auth().currentUser.uid === userID)
  {
    localStorage.setItem('productKey',key);
    window.location.href = 'chat.html';
  }
}

function deleteRow(key, row) {
  document.querySelector('tbody').removeChild(row.parentElement.parentElement);
  var ref = database.ref('ads/' + key).set({});
}
/////////////////////////////////////////// UPDATE ////////////////////////////////////////////
function addPopup(key) {
  var commentsRef = firebase.database().ref('ads/'+key);
  commentsRef.on('value', function (data) {
  //  console.log(data.val());
    var row =  showUpdate(data, data.key);
    document.getElementById("id01").style.display='block'
    document.getElementById("id01").innerHTML ="";
    document.getElementById("id01").innerHTML +=row

})
}
function showUpdate(data,key){
  return `
  <span onclick="document.getElementById('id01').style.display='none'" class="_close" title="Close Modal">&times;</span>
    <form class="_modal-content" onsubmit="return update('${key}');">
  <div class="_container">
            <h1>Update Product</h1>
            <hr>
            <label>Select Category
                <select style="height: 50px;" class="form-control" name="category" id="category">
                <option value="td">Mobiles</option>
                <option value="ti">Automobiles</option>
                <option value="hi">Furniture &amp; home Decor</option>
                <option value="c">Computer</option>
                <option value="eh">Electronics &amp; Home Appliance</option>
                </select>
            </label><br /><br />
            <label for="_pname"><b>Product Name</b></label>
            <input type="text" id="_pname" placeholder="Product Name" value="${data.val().productName}" value="Name" name="_pname" required>
          
            <label for="_price"><b>Price</b></label>
            <input type="number" placeholder="Enter Price" value="${data.val().Price}" name="_price" id="_price" required><br>
          
            <label for="_model"><b>Model Number</b></label>
            <input type="text" placeholder="Repeat Password" value="${data.val().modelNumber}" name="_model" id="_model" required>
          
            <label for="_year"><b>Year</b></label>
            <input type="number" placeholder="Enter Year" value="${data.val().year}" name="_year" id="_year" required><br>
            <label>Description <textarea name="address" id="address" cols="90" rows="10"" placeholder="Enter product Description">${data.val().Description}</textarea></label><br /><br />
            <br>
            
             <div class="clearfix">
              <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
              <button type="submit" class="signupbtn">Update</button>
            </div>
          </div>     
          </form> 
  `
}

var storage = firebase.storage();

function update(productkey){
 //   console.log(productkey);
    var e = document.getElementById("category");
    var dspText = e.options[e.selectedIndex].text;
    var dspVal = e.options[e.selectedIndex].value;
      var productName = document.getElementById('_pname').value;
      var modelNumber = document.getElementById('_model').value;
      var year = document.getElementById('_year').value;
      var Price = document.getElementById('_price').value;
      var Description = document.getElementById('address').value;

      var userID=localStorage.getItem('userID'); 
      var mobile=localStorage.getItem('mobile');
      
      var data = firebase.database().ref(`ads/${productkey}`);
      
      data.update({
          productName:productName,
          Description:Description,
          year : year,
          category: dspText,
          selectedInd: dspVal,
          Price : Price,
          modelNumber:modelNumber,
          mobile:mobile,
          userID:userID,
          date: (new Date()).toDateString(),

      });
return false;
  }

