import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
const db = getFirestore(app);

const loginToken = localStorage.getItem("token");
if (!loginToken) {
    window.location.href = "login.html";
}

const blogList = document.getElementById("blog-list")

const querySnapshot = await getDocs(collection(db, "blogs"));
querySnapshot.forEach((doc) => {
    const data = doc.data();
    blogList.innerHTML += `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.description}</p>
            </div>
        </div>
    </div>
    `;
})

const logoutButton = document.getElementById("logout");
logoutButton?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});