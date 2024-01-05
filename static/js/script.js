let loginForm = document.querySelector(".my-form");

loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    eel.validate_user(email.value, password.value);
})

eel.expose(login_response)
function login_response(response) {
    $('.response_login').text(response)
}

eel.expose(login_user)
function login_user(user) {
    location.href = "admin.html"; 
}

function logout() {
    eel.logout_user();
    location.href = "index.html";   
}

function setSession(user) {
    var texto= "Bienvenido:  " + user

    $('#user-navbar').text(texto)  
}

function getUserSession() {
    eel.getSession()(setSession)
}

function logins() {
    data = `<table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Usuario</th>
                <th scope="col">Login</th>
                <th scope="col">Logout</th>
            </tr>
        </thead>
        <tbody class="table-user" id="table-sessions-data">
        
        </tbody>
    </table>`

    $("#main").empty();
    $("#main").append(data);
    eel.getSessions()(AllSessions)
}

function AllSessions(sessions){
    sessions.forEach(e => {
        var line_data = "<tr><th scope='row'>"+e[0]+"</th><td>"+e[1]+"</td><td>"+e[2]+"</td><td>"+e[3]+"</td></tr>";
        console.log(line_data)

        $("#table-sessions-data").append(line_data);
    });
}


function AllUsers(users){
    users.forEach(e => {
        var line_data = "<tr><th scope='row'>"+e[0]+"</th><td>"+e[1]+"</td><td>"+e[2]+"</td><td>"+e[3]+"</td><td>"+e[4]+"</td></tr>";

        $("#table-user-data").append(line_data);
    });
}

function users() {
    //$("#main").load("users.html");

    data = `<table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
            </tr>
        </thead>
        <tbody class="table-user" id="table-user-data">
        
        </tbody>
    </table>`
    $("#main").empty();
    $("#main").append(data);
    eel.getUsers()(AllUsers)
}