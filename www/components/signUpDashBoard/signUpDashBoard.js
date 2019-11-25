
var myApp = new Framework7();

var $$ = Dom7;
// Your web app's Firebase configuration
  var db = firebase.firestore();
// signUp = () => {

//     let name = document.getElementById('userName').value ;
//     let email = document.getElementById('userEmail').value ;
//     let password = document.getElementById('userPassword').value ;
//     let country = document.getElementById('userCountry').value ;
    

//     const proxyurl = "https://cors-anywhere.herokuapp.com/";
//     const url = "http://52.10.59.40:8080/api/register"; 
//     fetch(proxyurl + url, {
//         method: 'post',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json',
//             'api_key': 'hello'
//         },
//         body: JSON.stringify({
//             "email": email,
//             "name": name,
//             "password": password,
//             "country": country
//         })
//     }).then(res => res.json())
//         .then(res => {
//             console.log(res);
//             $("#info").text(res.message);
//             if(res.message === "Email already exists. Please try a different one."){
//                 // Alert
//                     myApp.alert(res.message, 'Error!');
//             }
//             if(res.message === "User Created") {
//                 //This took me fucking 5 hours to find:
//                 mainView.router.load({                   
//                     url: "components/teamSplashBoard/teamSplash.html",
//                     ignoreCache: true,
//                     reload: true ,
             
//                 }); 
               
//             }
//         });
        
// }
function ValidateAccount()
{
    let emailDiv = document.getElementById('userEmail');
    let nameDiv = document.getElementById("userName");
    let pwDiv = document.getElementById("userPassword");
    let pwDiv2 = document.getElementById("userPassword2");
    let countryDiv = document.getElementById("userCountry");

    let name = document.getElementById('userName').value ;
    let password = document.getElementById('userPassword').value ;
    let secondPassword = document.getElementById('userPassword2').value ;
    let country = document.getElementById('userCountry').value ;
    let email = document.getElementById('userEmail').value ;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(name == ""){
        nameDiv.placeholder = "Enter an username!"
        nameDiv.style.border = '3px solid red';
        nameDiv.style.boxShadow = "-1px 1px 15px -1px red";
        nameDiv.value = "";
        nameDiv.focus();
        return false; 
    }
    if(email.match(mailformat) === null)
    {
        emailDiv.style.border = '3px solid red';
        emailDiv.style.border = '3px solid red';
        emailDiv.style.boxShadow = "-1px 1px 15px -1px red";
        emailDiv.value = "";
        emailDiv.focus();
        emailDiv.placeholder = 'Enter a valid email address!';
        return false;
    }
    if(password == ""){
        pwDiv.placeholder = "Enter a password ! (Required)"
        pwDiv.style.border = '3px solid red';
        pwDiv.style.boxShadow = "-1px 1px 15px -1px red";
        pwDiv.value = "";
        pwDiv.focus();
        return false; 
    }
    if(secondPassword == ""){
        pwDiv2.placeholder = "Please enter confirm password ! (Required)"
        pwDiv2.style.border = '3px solid red';
        pwDiv2.style.boxShadow = "-1px 1px 15px -1px red";
        pwDiv2.value = "";
        pwDiv2.focus();
        return false; 
    }
     if (password != secondPassword) { 
        pwDiv.placeholder = "Password did not match!"
        pwDiv2.placeholder = "Password did not match!"
        pwDiv2.style.border = '3px solid red';
        pwDiv2.style.boxShadow = "-1px 1px 15px -1px red";
        pwDiv.style.border = '3px solid red';
        pwDiv.style.boxShadow = "-1px 1px 15px -1px red";
        pwDiv.value = "";
        pwDiv2.value = "";
        pwDiv.value = "";
        return false; 
    } 
    if(country == ""){
        countryDiv.placeholder = "Select your country!"
        pwDiv2.style.border = '3px solid red';
        pwDiv2.style.boxShadow = "-1px 1px 15px -1px red";
        countryDiv.focus();
        return false; 
    }
   
     else
    {
        //signUp();
        signUpWithFirebase();
       var storage = window.localStorage;
       storage.setItem("country",country);
       storage.setItem("email",email);
    }
}
signUpWithFirebase = () =>{
    let name = document.getElementById('userName').value ;
    let uemail = document.getElementById('userEmail').value ;
    let password = document.getElementById('userPassword').value ;
    let country = document.getElementById('userCountry').value ;

  firebase.auth().createUserWithEmailAndPassword(uemail, password).then(function(succ){
      console.log(succ);
      mainView.router.load({                   
        url: "components/teamSplashBoard/teamSplash.html",
        ignoreCache: true,
        reload: true ,
 
    }); 
  }).catch(function(error) {
    // Handle Errors here.
    var errorMessage = error.message;
    myApp.alert(errorMessage, 'Error!');
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // If user is signed up and add all data to db
      db.collection('users').add({
        username:name,
        userEmail:uemail,
        password: password,
        country:country,
        //I added userId to Doc like foreign key 
        userId:user.uid
        }).then(function() {
            console.log("Document successfully written!");
            
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });
      // ...
    } else {
     console.log("User Succesfully-Signed out");
    }
  });
}