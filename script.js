// Product data with 33 products
const products = Array.from({ length: 83 }, (_, i) => {
    let price;
    const id = i + 1;
    
    // Set specific prices based on product ID
    switch(id) {
        case 1: price = 99; break;
    case 2: price = 199; break;
    case 3: price = 99; break;
    case 4: price = 99; break;
    case 5: price = 99; break;
    case 6: price = 99; break;
    case 7: price = 99; break;
    case 8: price = 99; break;
    case 9: price = 99; break;
    case 10: price = 99; break;
    case 11: price = 100; break;
    case 12: price = 100; break;
    case 13: price = 100; break;
    case 14: price = 100; break;
    case 15: price = 100; break;
    case 16: price = 350; break;
    case 17: price = 350; break;
    case 18: price = 300; break;
    case 19: price = 300; break;
    case 20: price = 350; break;
    case 21: price = 350; break;
    case 22: price = 350; break;
    case 23: price = 150; break;
    case 24: price = 220; break;
    case 25: price = 400; break;
    case 26: price = 800; break;
    case 27: price = 200; break;
    case 28: price = 180; break;
    case 29: price = 100; break;
    case 30: price = 180; break;
    case 31: price = 300; break;
    case 32: price = 400; break;
    case 33: price = 300; break;
    case 34: price = 850; break;
    case 35: price = 1250; break;
    case 36: price = 1100; break;
    case 37: price = 300; break;
    case 38: price = 300; break;
    case 39: price = 300; break;
    case 40: price = 300; break;
    case 41: price = 250; break;
    case 42: price = 300; break;
    case 43: price = 250; break;
    case 44: price = 250; break;
    case 45: price = 300; break;
    case 46: price = 250; break;
    case 47: price = 900; break;
    case 48: price = 300; break;
    case 49: price = 300; break;
    case 50: price = 250; break;
    case 51: price = 1100; break;
    case 52: price = 1000; break;
    case 53: price = 1000; break;
    case 54: price = 1200; break;
    case 55: price = 1000; break;
    case 56: price = 1300; break;
    case 57: price = 1000; break;
    case 58: price = 600; break;
    case 59: price = 1200; break;
    case 60: price = 1200; break;
    case 61: price = 1200; break;
    case 62: price = 1200; break;
    case 63: price = 1600; break;
    case 64: price = 4000; break;
    case 65: price = 4000; break;
    case 66: price = 5000; break;
    case 67: price = 5000; break;
    case 68: price = 5000; break;
    case 69: price = 5000; break;
    case 70: price = 2500; break;
    case 71: price = 2000; break;
    case 72: price = 5000; break;
    case 73: price = 5000; break;
    case 74: price = 5000; break;
    case 75: price = 5000; break;
    case 76: price = 5000; break; 
    case 77: price = 800; break;
  case 78: price = 800; break;
case 79: price = 800; break;
case 80: price = 800; break;
case 81: price = 1000; break;
case 82: price = 1700; break;
case 83: price = 800; break;

    }

    return {
        id,
        name: `Product ${id}`,
        price: price * 1.1, // Adding 10% to original price for showing cut price
        originalPrice: price, // Keeping original price for reference
        image: `${id}.jpg`
    };
});

let cart = [];

// Initialize products
function initializeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    products.forEach(product => {
        productsGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="original-price">৳${product.price.toFixed(2)}</p>
                <p class="discounted-price">৳${product.originalPrice.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Show discount popup after 15 seconds
setTimeout(() => {
    document.getElementById('discountPopup').style.display = 'block';
    setTimeout(() => {
        document.getElementById('discountPopup').style.display = 'none';
    }, 7000);
}, 15000);

function addToCart(productId) {
    const quantityPrompt = document.createElement('div');
    quantityPrompt.className = 'quantity-prompt';
    quantityPrompt.innerHTML = `
        <div class="prompt-content">
            <h3>আপনি কয়টা প্রোডাক্ট কিনতে চান?</h3>
            <select id="quantitySelect">
                ${Array.from({length: 20}, (_, i) => 
                    `<option value="${i + 1}">${i + 1}</option>`
                ).join('')}
            </select>
            <div class="prompt-buttons">
                <button onclick="confirmQuantity(${productId})">ঠিক আছে</button>
                <button onclick="closeQuantityPrompt()">বাতিল</button>
            </div>
        </div>
    `;
    document.body.appendChild(quantityPrompt);
}

function confirmQuantity(productId) {
    const quantitySelect = document.getElementById('quantitySelect');
    const quantity = quantitySelect.value;
    
    if (quantity && !isNaN(quantity) && quantity > 0) {
        const product = products.find(p => p.id === productId);
        cart.push({
            ...product,
            quantity: parseInt(quantity)
        });
        updateCart();
    }
    closeQuantityPrompt();
}

function closeQuantityPrompt() {
    const prompt = document.querySelector('.quantity-prompt');
    if (prompt) {
        prompt.remove();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const deliveryCharge = document.getElementById('deliveryCharge');
    const cartTotal = document.getElementById('cartTotal');
    
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    let subtotal = 0;
    let totalQuantity = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.originalPrice * item.quantity; // Use original price instead of applying discount
        subtotal += itemTotal;
        totalQuantity += parseInt(item.quantity);
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>৳${itemTotal.toFixed(2)}</p>
                </div>
                <button class="delete-item" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
    });
    
    // Check if total quantity is 10 or more for free delivery
    const delivery = totalQuantity >= 10 ? 0 : 70;
    
    cartSubtotal.textContent = subtotal.toFixed(2);
    deliveryCharge.textContent = delivery;
    cartTotal.textContent = (subtotal + delivery).toFixed(2);
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
}

function showCheckoutForm() {
    document.getElementById('checkoutForm').style.display = 'block';
}

// Submit order to Telegram
async function submitOrder(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const totalQuantity = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
    const deliveryCharge = totalQuantity >= 10 ? 0 : 70;
    
    const orderDetails = {
        name: formData.get('name'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        items: cart.map(item => `${item.name} x${item.quantity}`).join('\n'),
        subtotal: document.getElementById('cartSubtotal').textContent,
        delivery: deliveryCharge,
        total: document.getElementById('cartTotal').textContent
    };

    const message = `
New Order:
Name: ${orderDetails.name}
Address: ${orderDetails.address}
Phone: ${orderDetails.phone}
Items:
${orderDetails.items}
Subtotal: ৳${orderDetails.subtotal}
Delivery: ৳${orderDetails.delivery}
Total: ৳${orderDetails.total}
    `;

    try {
        await fetch(`https://api.telegram.org/bot7447671480:AAFtEWOh_y3k5UpIeUnV-5fJdV3L-RlqC6M/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: '906269717',
                text: message
            })
        });
        
        alert('Order placed successfully!');
        cart = [];
        updateCart();
        document.getElementById('checkoutForm').style.display = 'none';
    } catch (error) {
        alert('Error placing order. Please try again.');
    }
}

// Initialize
initializeProducts();
