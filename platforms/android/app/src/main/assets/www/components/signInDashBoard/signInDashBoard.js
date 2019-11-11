signIn = () => {

    let username = document.getElementById('loginName').value ;
    let password = document.getElementById('loginPassword').value ;

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
            "username": username,
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
            }
        });
}