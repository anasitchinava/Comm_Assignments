document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.getElementById("checkoutBtn");

    checkoutBtn.addEventListener("click", () => {
        window.location.href = `./payment.html?total=${total}`;
    });
});
