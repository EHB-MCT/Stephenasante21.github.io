//update the user
document.getElementById('save').addEventListener("click", async event => {
    event.preventDefault();

    // Get new username and password values
    const newUsername = document.getElementById("username").value;
    const newPassword = document.getElementById("password").value;

    // Get the userId from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user.uuid;

    // Create the user object for updating
    const updatedUser = {
        username: newUsername,
        password: newPassword,
    };
 
    getData(`https://web-2-art-dump.onrender.com/update/${userId}`, "PUT", updatedUser)
        .then(result => {
            if (result.status === "Success") {
                alert("User successfully updated!");
                window.location.href = "/web2-frontend-Stephenasante21/account.html";
            } else {
                console.error("Error updating user:", result.error);
                alert("An error occurred while updating the user.");
            }
        })
        .catch(error => {
            console.error("Error updating user:", error);
            alert("An error occurred while updating the user.");
        });

    
});

//delete the user
document.getElementById('delete_account').addEventListener("click", async event => {
    event.preventDefault();

    //get userID from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user.uuid;

    try {
        const response = await fetch(`https://web-2-art-dump.onrender.com/delete/${userId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (response.ok) {
            const result = await response.json();
            if (result.status === "Success") {
                alert("User successfully deleted");
                sessionStorage.removeItem('user');
                // Redirect to the login page
                window.location.href = "/web2-frontend-Stephenasante21/login.html";
            } else {
                console.error("Error deleting user:", result.message);
                alert("An error occurred while deleting the user.");
            }
        } else {
            console.error("Error deleting user. Server responded with status:", response.status);
            alert("An error occurred while deleting the user.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
});


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