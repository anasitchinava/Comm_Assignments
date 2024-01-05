const token = localStorage.getItem("token")

tokenCheck: {
    switch (true) {
        case token:
            window.location.href = "./home.html";
            break tokenCheck;
        case !token:
            window.location.href = "./index.html";
            break;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            localStorage.removeItem("token");
            window.location.href = "./index.html";
        });
    }
});