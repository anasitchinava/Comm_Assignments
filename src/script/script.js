import users from './data.js';

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        const token = Math.random().toString(36).substr(2);
        localStorage.setItem("token", token);
        window.location.href = "./home.html";
    } else {
        alert("Wrong email or password");
    }
   
})


const token = localStorage.getItem("token")
if (token) {
    window.location.href = "./home.html"
}