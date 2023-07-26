document.getElementById('form').addEventListener("submit", event => {
    event.preventDefault();

    let user = {}
    user.username = document.getElementById("username")
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;
    user.password2 = document.getElementById("password2").value;

    //check for the password
    if(user.password == user.password2){
        getData("http://localhost:3000/register", "POST", user).then(data => {
            alert(data.message)
        })
    }else{
        alert("Passwords does not match!!!")
    }

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