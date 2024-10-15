// ----------search and user box functionality--------------

document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('search-icon');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const userIcon = document.getElementById('user-icon');
    const userBox = document.getElementById('user-box');

    searchIcon.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close the user box if it's open
        if (userBox.classList.contains('active')) {
            userBox.classList.remove('active');
        }

        // Toggle the display of the search box
        if (searchBox.style.display === 'block') {
            searchBox.style.display = 'none';
        } else {
            searchBox.style.display = 'block';
        }
    });

    userIcon.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close the search box if it's open
        if (searchBox.style.display === 'block') {
            searchBox.style.display = 'none';
        }

        userBox.classList.toggle('active');
    });

    // Close both search and user boxes when clicking outside of them
    document.addEventListener('click', function (e) {
        if (!searchIcon.contains(e.target) && !searchBox.contains(e.target)) {
            searchBox.style.display = 'none';
        }
        if (!userIcon.contains(e.target) && !userBox.contains(e.target)) {
            userBox.classList.remove('active');
        }
    });
});


// --------------------------------pop up and thanku message --------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    
    var submitButton = document.getElementById("submitButton");
    var nameInput = document.getElementById("name");
    var mobileInput = document.getElementById("mobile");
    var messageOverlay = document.getElementById("messageOverlay");
    var closeButton = document.getElementById("closeButton");

    submitButton.addEventListener("click", function (event) {
        if (nameInput.value === "" || mobileInput.value === "") {
            event.preventDefault(); // Prevent the form from submitting
            alert("Please fill all the details.");
        } else {
            // Show the message overlay when the form is valid
            messageOverlay.style.display = "flex";
        }
    });

    closeButton.addEventListener("click", function () {
        // Close the message overlay when the close button is clicked
        messageOverlay.style.display = "none";
    });
});
// Toggle login box visibility when user icon is clicked
document.getElementById('user-icon').addEventListener('click', function(event) {
    event.preventDefault();
    const userBox = document.getElementById('user-box');
    userBox.style.display = (userBox.style.display === 'none' || userBox.style.display === '') ? 'block' : 'none';
});

// Handle login button click event
document.getElementById('login-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission (page reload)

    // Get values from email and password input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (email === "" || password === "") {
        alert("Please enter both email and password.");
        return;
    }

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    // Simulate a login process (you can replace this with actual server-side login logic)
    alert("Login successful!");

    // Close the login box after successful login
    document.getElementById('user-box').style.display = 'none';

    // Optionally, you can redirect to another page
    // window.location.href = "dashboard.html";
});
// Initialize an empty cart array to hold product objects
// Initialize an empty cart array to hold product objects
let cart = [];

// Function to update the cart count in the navbar
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Function to add a product to the cart
function addToCart(productId, productName, productPrice, productImage) {
    // Create a product object
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage // Store the image URL
    };

    // Add product to cart array
    cart.push(product);

    // Update the cart count in the nav bar
    updateCartCount();

    // Notify the user
    alert(`${productName} added to the cart.`);
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    updateCartCount();
}

// Add event listeners to each 'Add to Cart' button
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Get the product details from the clicked card
        const card = this.closest('.card');
        const productId = card.getAttribute('data-id');
        const productName = card.querySelector('h3').innerText;
        const productPrice = card.querySelector('span').innerText;
        const productImage = card.querySelector('img').src; // Get the product image URL

        // Call the addToCart function with product details
        addToCart(productId, productName, productPrice, productImage);
    });
});

// Simulate clicking the cart icon to view items and checkout
document.getElementById('cart-icon').addEventListener('click', function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        displayCartDetails(); // Function to display cart details and options
    }
});

// Function to display cart details and options like remove and checkout
function displayCartDetails() {
    // Clear existing content
    document.body.innerHTML = ''; // Clear existing content

    // Create a container for the whole cart layout
    let cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');

    // Header Section
    let header = document.createElement('header');
    header.classList.add('cart-header');
    header.innerHTML = '<h1>Cart Items</h1>';
    cartContainer.appendChild(header);

    // Create a div to display cart details
    let cartDetailsDiv = document.createElement('div');
    cartDetailsDiv.classList.add('cart-details-container');

    cart.forEach((product, index) => {
        // Create a product container div
        let productDiv = document.createElement('div');
        productDiv.classList.add('product-item');

        // Product image
        let productImage = document.createElement('img');
        productImage.src = product.image; // Assuming `product.image` is the URL for the image
        productImage.alt = product.name;
        productImage.classList.add('product-image');

        // Product details
        let productDetails = document.createElement('div');
        productDetails.classList.add('product-details');
        
        let productName = document.createElement('p');
        productName.innerText = product.name;
        productName.classList.add('product-name');
        
        let productPrice = document.createElement('p');
        productPrice.innerText = `Price: ${product.price}`;
        productPrice.classList.add('product-price');

        // Add "Remove" button next to each item
        let removeButton = document.createElement('button');
        removeButton.innerText = `Remove`;
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', function() {
            removeFromCart(index);  // Call the function to remove the product
        });

        // Append elements to productDiv
        productDetails.appendChild(productName);
        productDetails.appendChild(productPrice);
        productDetails.appendChild(removeButton);

        productDiv.appendChild(productImage); // Append the product image
        productDiv.appendChild(productDetails);
        cartDetailsDiv.appendChild(productDiv);
    });

    // Add a checkout button
    let checkoutButton = document.createElement('button');
    checkoutButton.innerText = 'Proceed to Checkout';
    checkoutButton.classList.add('checkout-button');
    
    // Add event listener to proceed to checkout
    checkoutButton.addEventListener('click', function() {
        window.location.href = "checkout.html"; // Redirect to checkout page
    });

    cartDetailsDiv.appendChild(checkoutButton);

    // Add a "Continue Shopping" button
    let continueShoppingButton = document.createElement('button');
    continueShoppingButton.innerText = 'Continue Shopping';
    continueShoppingButton.classList.add('continue-button');
    
    // Add event listener to continue shopping
    continueShoppingButton.addEventListener('click', function() {
        window.location.href = "index.html"; // Redirect to your main shopping page
    });

    cartDetailsDiv.appendChild(continueShoppingButton);
    cartContainer.appendChild(cartDetailsDiv);

    // Footer Section
    let footer = document.createElement('footer');
    footer.classList.add('cart-footer');
    footer.innerHTML = '<p>© 2024 Indian Handicraft store. All rights reserved.</p>';
    cartContainer.appendChild(footer);

    // Append the complete cart container to the body
    document.body.appendChild(cartContainer);
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item from the cart array
    alert("Item removed from the cart.");
    displayCartDetails(); // Refresh the cart details view
}





