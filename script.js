const cartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

if (cartCount) {
    cartCount.textContent = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
    );
}


cartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const productCard = button.parentElement;

        const productName =
            productCard.querySelector("h3").textContent;

        const productPrice =
            productCard.querySelector(".price").textContent;

        const product = {
            name: productName,
            price: productPrice,
            quantity: 1
        };

        cartItems.push(product);

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

        if (cartCount) {
            cartCount.textContent = cartItems.reduce(
                (sum, item) => sum + (item.quantity || 1),
                0
            );
        }
    });
});


const cartContainer = document.getElementById("cart-items");

if (cartContainer) {

    const savedCart =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let total = 0;
    let totalItems = 0;

    savedCart.forEach((item, index) => {

        if (!item.quantity) {
            item.quantity = 1;
        }

        const price = parseFloat(
            item.price.replace(/[^0-9.]/g, "")
        );

        total += price * item.quantity;
        totalItems += item.quantity;

        const cartProduct = document.createElement("div");

        cartProduct.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ${item.price}</p>

            <button class="quantity-minus" data-index="${index}">
                −
            </button>

            <span class="quantity">
                ${item.quantity}
            </span>

            <button class="quantity-plus" data-index="${index}">
                +
            </button>

            <br><br>

            <button class="remove-btn" data-index="${index}">
                Remove
            </button>

            <hr>
        `;

        cartContainer.appendChild(cartProduct);
    });


    const cartTotal =
        document.getElementById("cart-total");

    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }


    const plusButtons =
        document.querySelectorAll(".quantity-plus");

    plusButtons.forEach(button => {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);

            cartItems[index].quantity =
                (cartItems[index].quantity || 1) + 1;

            localStorage.setItem(
                "cartItems",
                JSON.stringify(cartItems)
            );

            location.reload();
        });
    });


    const minusButtons =
        document.querySelectorAll(".quantity-minus");

    minusButtons.forEach(button => {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);

            if ((cartItems[index].quantity || 1) > 1) {

                cartItems[index].quantity--;

            } else {

                cartItems.splice(index, 1);
            }

            localStorage.setItem(
                "cartItems",
                JSON.stringify(cartItems)
            );

            location.reload();
        });
    });


    const removeButtons =
        document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);

            cartItems.splice(index, 1);

            localStorage.setItem(
                "cartItems",
                JSON.stringify(cartItems)
            );

            location.reload();
        });
    });


    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}


const clearCartButton =
    document.getElementById("clear-cart");

if (clearCartButton) {

    clearCartButton.addEventListener("click", function () {

        localStorage.removeItem("cartItems");

        location.reload();
    });
}


const checkoutButton =
    document.getElementById("checkout-btn");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        const cart =
            JSON.parse(localStorage.getItem("cartItems")) || [];

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        window.location.href = "checkout.html";
    });
}


const checkoutTotal =
    document.getElementById("checkout-total");

if (checkoutTotal) {

    const cart =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let total = 0;

    cart.forEach(item => {

        const price = parseFloat(
            item.price.replace(/[^0-9.]/g, "")
        );

        const quantity = item.quantity || 1;

        total += price * quantity;
    });

    checkoutTotal.textContent =
        total.toFixed(2);
}


const checkoutForm =
    document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const cart =
            JSON.parse(localStorage.getItem("cartItems")) || [];

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        alert("Order placed successfully!");

        localStorage.removeItem("cartItems");

        window.location.href = "order-success.html";
    });
}

const productSearch = document.getElementById("product-search");

if (productSearch) {

    productSearch.addEventListener("input", function () {

        const searchText = productSearch.value.toLowerCase();

        const productCards =
            document.querySelectorAll(".product-card");

        productCards.forEach(card => {

            const productName =
                card.querySelector("h3").textContent.toLowerCase();

            if (productName.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

const categoryCards = document.querySelectorAll(".category-card");
const productCards = document.querySelectorAll(".product-card");

categoryCards.forEach(function (category) {

    category.addEventListener("click", function () {

        const selectedCategory = category.getAttribute("data-category");

        productCards.forEach(function (product) {

            const productCategory = product.getAttribute("data-category");

            if (productCategory === selectedCategory) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });

});

const showAllProductsBtn = document.getElementById("show-all-products");

if (showAllProductsBtn) {
    showAllProductsBtn.addEventListener("click", function () {
        const products = document.querySelectorAll(".product-card");

        products.forEach(function (product) {
            product.style.display = "block";
        });
    });
}

const detailButtons = document.querySelectorAll(".view-details");

detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.parentElement;

        const productName =
            productCard.querySelector("h3").textContent;

        const productPrice =
            productCard.querySelector(".price").textContent;

        const productImage =
            productCard.querySelector("img").getAttribute("src");

        const productDescription =
            "This is a high-quality " + productName + " with great features and excellent performance.";

        const productData = {
            name: productName,
            price: productPrice,
            image: productImage,
            description: productDescription
        };

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(productData)
        );

        window.location.href = "product-details.html";

    });

});


const addToCartButton =
    document.getElementById("add-to-cart-btn");

if (addToCartButton) {

    addToCartButton.addEventListener("click", function () {

        const selectedProduct =
            JSON.parse(localStorage.getItem("selectedProduct"));

        if (!selectedProduct) {
            alert("Product not found!");
            return;
        }

        let cartItems =
            JSON.parse(localStorage.getItem("cartItems")) || [];

        const product = {
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: productQuantity
        };

        cartItems.push(product);

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

        alert("Product added to cart!");

        if (cartCount) {
            cartCount.textContent = cartItems.reduce(
                (sum, item) => sum + (item.quantity || 1),
                0
            );
        }

    });
}


let productQuantity = 1;

const quantityMinus =
    document.getElementById("quantity-minus");

const quantityPlus =
    document.getElementById("quantity-plus");

const quantityDisplay =
    document.getElementById("product-quantity");


if (quantityMinus && quantityPlus && quantityDisplay) {

    quantityMinus.addEventListener("click", function () {

        if (productQuantity > 1) {
            productQuantity--;

            quantityDisplay.textContent =
                productQuantity;
        }

    });


    quantityPlus.addEventListener("click", function () {

        productQuantity++;

        quantityDisplay.textContent =
            productQuantity;

    });

}