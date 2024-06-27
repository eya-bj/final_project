$(function(){
    $(".toogle").on("click",function(){
        if($("menu").hasClass("active")){
            $(".menu").removeClass("active");
            $(this).find("a").html("<ion-icon name='menu-outline'></ion-icon>");
        }
        else{
            $(".menu").addClass("active");
            $(this).find("a").html("<ion-icon name='close-outline'></ion-icon>");
        }
    });
});
import products from "./products.js";

document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('.list');

    // Function to initialize the checkout page with products
    const initCheckout = () => {
        list.innerHTML = ''; // Clear existing content

        // Loop through products and create HTML elements
        products.forEach(product => {
            const item = createCartItem(product);
            list.appendChild(item);
        });
    };

    // Create HTML for each product item
    const createCartItem = (product) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div class="details">
                <div class="name">${product.name}</div>
                <div class="price">${product.price} DT</div>
            </div>
            <div class="quantity">
                <button class="minus">-</button>
                <span>1</span>
                <button class="plus">+</button>
            </div>
            <div class="subtotal">${product.price} DT</div>
        `;

        const minusBtn = item.querySelector('.minus');
        const plusBtn = item.querySelector('.plus');
        const quantitySpan = item.querySelector('.quantity span');
        const subtotalDiv = item.querySelector('.subtotal');

        // Event listener for decreasing quantity
        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                subtotalDiv.textContent = `${product.price * quantity} DT`;
                updateTotalQuantityAndPrice();
            }
            else {
                // If quantity is 1, remove the item
                list.removeChild(item);
            }
            updateTotalQuantityAndPrice();
        });

        // Event listener for increasing quantity
        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            subtotalDiv.textContent = `${product.price * quantity} DT`;
            updateTotalQuantityAndPrice();
        });

        return item;
    };

    // Initialize checkout page on page load
    initCheckout();

    // Function to calculate total quantity and price
    function updateTotalQuantityAndPrice() {
        const quantityElements = document.querySelectorAll('.quantity span');
        const subtotalElements = document.querySelectorAll('.subtotal');
        let totalQuantity = 0;
        let totalPrice = 0;

        quantityElements.forEach((quantityElement, index) => {
            const quantity = parseInt(quantityElement.textContent);
            const price = parseFloat(subtotalElements[index].textContent);
            totalQuantity += quantity;
            totalPrice += price;
        });

        // Display total quantity and price
        const quantityDisplay = document.querySelector('.totalquantity');
        const priceDisplay = document.querySelector('.totalprice');
        quantityDisplay.textContent = totalQuantity;
        priceDisplay.textContent = totalPrice.toFixed(2) + ' DT';
    }

    // Event listener for pickup type selection
    const pickupTypeSelect = document.getElementById('pickup_type');
    pickupTypeSelect.addEventListener('change', function() {
        const selectedOption = this.value;
        if (selectedOption === 'Delivery') {
            const priceDisplay = document.querySelector('.totalprice');
            let totalPrice = parseFloat(priceDisplay.textContent);
            totalPrice += 7.00; // Delivery cost
            priceDisplay.textContent = totalPrice.toFixed(2) + ' DT';
        }
    });

    // Event listener for checkout button
    const checkoutBtn = document.querySelector('.buttoncheckout');
    checkoutBtn.addEventListener('click', function() {
        // Validate form fields
        const fullName = document.getElementById('fullname').value.trim();
        const phoneNumber = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value;
        const pickupType = document.getElementById('pickup_type').value;

        // Validate full name (alphabetical only)
        if (!isValidName(fullName)) {
            alert('Please enter a valid full name (alphabetical characters only).');
            return;
        }

        // Validate phone number (must contain 8 digits)
        if (!isValidPhoneNumber(phoneNumber)) {
            alert('Please enter a valid phone number (8 digits only).');
            return;
        }

        // Validate address (non-empty)
        if (address === '') {
            alert('Please enter your address.');
            return;
        }

        // Validate city selection
        if (city === '') {
            alert('Please select your city.');
            return;
        }

        // Validate pickup type selection
        if (pickupType === '') {
            alert('Please select pickup type.');
            return;
        }

        // If all validations pass, proceed with checkout
        alert('The operation went well! Your order has been placed.');

        // Clear form fields (optional)
        document.getElementById('fullname').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('pickup_type').value = '';
    });

    // Function to validate full name (alphabetical characters only)
    function isValidName(name) {
        return /^[a-zA-Z]+$/.test(name);
    }

    // Function to validate phone number (8 digits only)
    function isValidPhoneNumber(phone) {
        return /^\d{8}$/.test(phone);
    }
});

