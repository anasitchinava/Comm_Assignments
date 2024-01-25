import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {doc, getFirestore, setDoc} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
const phoneNum = document.getElementById("phone");
const address = document.getElementById("address");
const persId = document.getElementById("persId");
const signup = document.getElementById("signup");

const auth = getAuth();
const db = getFirestore(app);

signup?.addEventListener("click", (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((res) => {
        const user = res.user;
        setDoc(doc(db, "users", user.uid),  {
            email: email.value,
            phone_number: phoneNum.value,
            address: address.value,
            personal_id: persId.value,
        }).then(() => {
            window.location.href = "login.html";
            // window.location.href = "./src/pages/login.html";
        }).catch((error) => {
            alert(error.message);
        })
        localStorage.setItem("token", user.accessToken);
    }).catch((error)=> {
        alert(error.message);
    })
});