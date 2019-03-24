function check()
{var contact = document.getElementById("contact").value;
var res = contact.match("^((00923)|(923)|(03)|(3))-{0,1}/d{2}-{0,1}/d{7}$")
console.log("good");
}