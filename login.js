document.getElementById('form').addEventListener("submit", event => {
    event.preventDefault();

    let user = {}
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;

    //check for login 
    getData("http://localhost:3000/login", "POST", user).then(result => {

        if(result){
            sessionStorage.setItem('user', JSON.stringify(result.data))
            window.location.href = "/web2-frontend-Stephenasante21/index.html"
        }else {
            console.log("No user with this credentials")
        }

    })


})

async function getData(url, method, data){
    let resp = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return await resp.json();
}