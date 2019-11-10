// $(document).ready(function(){
//   $("#signup-link").click(function(){
//      window.location.href = "signUpDashBoard.html"
//     // const loginPage =  document.querySelector('.views');
//     // loginPage.classList.add('animated', 'flipInY');
//   });
// });
signUp = () => {

    let name = document.getElementById('userName').value ;
    let email = document.getElementById('userEmail').value ;
    let password = document.getElementById('userPassword').value ;
    let country = document.getElementById('userCountry').value ;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://34.221.179.153:8080/api/register"; 
    fetch(proxyurl + url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'api_key': 'hello'
        },
        body: JSON.stringify({
            "email": email,
            "name": name,
            "password": password,
            "country": country
        })
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            $("#info").text(res.message);
            if(res.message === "User Created") {
                //This took me fucking 5 hours to find:
                mainView.router.load({                   
                    url: "components/teamSplashBoard/teamSplash.html",
                    ignoreChache: true,
                    reload: true                    
                });
            }
        });
}