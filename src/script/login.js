import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwq69BPPiocbqSrQ4uNo4oir-Gm6it4V4",
    authDomain: "commschool-d32c4.firebaseapp.com",
    projectId: "commschool-d32c4",
    storageBucket: "commschool-d32c4.appspot.com",
    messagingSenderId: "46589779219",
    appId: "1:46589779219:web:a61f41f3ed3a479c8c4ee6",
    measurementId: "G-D9F26G4473"
};

const app = initializeApp(firebaseConfig);

const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");

const auth = getAuth();

login.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((res) => {
        const user = res.user;
        localStorage.setItem("token", user.accessToken);
        window.location.href = "dashboard.html";
    }).catch((error)=> {
        alert(error.message);
    })
});