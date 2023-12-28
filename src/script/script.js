import products from './productsData.js';

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const listItem = document.createElement("li");
        listItem.classList.add("product-item");

        const productInfo = document.createElement("div");

        const productName = document.createElement("h3");
        productName.textContent = product.name;
        productInfo.appendChild(productName);

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productInfo.appendChild(productImage);

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;
        productInfo.appendChild(productDescription);

        const productPrice = document.createElement("p");
        productPrice.innerHTML = `Price: <strong>$${product.price}</strong>`;
        productInfo.appendChild(productPrice);

        const checkAvailabilityButton = document.createElement("button");
        checkAvailabilityButton.textContent = "Check Availability";
        checkAvailabilityButton.addEventListener("click", () => {
            alert(product.availability === "In Stock" ? "Product is available!✅" : "Oops, the product is out of stock.");
        });
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        buttonContainer.appendChild(checkAvailabilityButton);
        productInfo.appendChild(buttonContainer);

        listItem.appendChild(productInfo);
        productList.appendChild(listItem);
    });
});
