signIn = (email,pw) => {

    let mail = email;
    let password = pw;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://34.221.179.153:8080/api/login"; 
    fetch(proxyurl + url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'api_key': 'hello'
        },
        body: JSON.stringify({
            "username": mail,
            "password": password
        })
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            $("#infoLogin").text(res.message);
            if(res.message === "User Found") {
                //This took me fucking 5 hours to find:
                mainView.router.load({                   
                    url: "components/userDashboard/userDashboard.html",
                    ignoreChache: true,
                    reload: true                    
                });
            }else {
                 // Alert
                 myApp.alert("User not Found!", 'Error!');
            }
        });
}

function ValidateSignInSplash()
{
    var email = document.getElementById("loginName");
    var pw = document.getElementById("loginPassword");
    

    if(email.value == ""){
        email.placeholder = "Username cannot be blank!";
        email.style.border = '3px solid red';
        email.style.boxShadow = "-1px 1px 15px -1px red";
        email.value = "";
        email.focus();
        return false; 
    }
    if(pw.value == ""){
        pw.placeholder = "Password cannot be blank!";
        pw.style.border = '3px solid red';
        pw.style.boxShadow = "-1px 1px 15px -1px red";
        pw.value = "";
        pw.focus();
        return false; 
    }
    else
    {
        email.style.border = "";
        email.style.boxShadow = "";
        pw.style.border = "";
        pw.style.boxShadow = "";
       signIn(email.value,pw.value);
       var storage = window.localStorage;
       storage.setItem("email",email.value);
    }
}
function ValidateSignIn(){
    var email1 = document.getElementById("userNonAnim");
    var pw1 = document.getElementById("pwNonAnim");
    

    if(email1.value == ""){
        email1.placeholder = "Username cannot be blank!";
        email1.style.border = '3px solid red';
        email1.style.boxShadow = "-1px 1px 15px -1px red";
        email1.value = "";
        email1.focus();
        return false; 
    }
    if(pw1.value == ""){
        pw1.placeholder = "Password cannot be blank!";
        pw1.style.border = '3px solid red';
        pw1.style.boxShadow = "-1px 1px 15px -1px red";
        pw1.value = "";
        pw1.focus();
        return false; 
    }
    else
    {
        email1.style.border = "";
        email1.style.boxShadow = "";
        pw1.style.border = "";
        pw1.style.boxShadow = "";
       signIn(email1.value,pw1.value);
       var storage = window.localStorage;
       storage.setItem("email",email1.value);
    }
}