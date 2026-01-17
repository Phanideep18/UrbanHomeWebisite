// --- DATA & STORAGE ---
let cart = JSON.parse(localStorage.getItem('urban_cart')) || [];
let orders = JSON.parse(localStorage.getItem('urban_orders')) || [];

function saveToStorage() {
    localStorage.setItem('urban_cart', JSON.stringify(cart));
    localStorage.setItem('urban_orders', JSON.stringify(orders));
    updateCartUI();
}

// --- CORE FUNCTIONS ---
window.addToCartDB = (id) => {
    const products = {
        'bedding': {title: 'Luxe Bedding', price: 4999, img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=200'},
        'sofa': {title: 'Velvet Sofa', price: 12999, img: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=200'},
        'lamp': {title: 'Floor Lamp', price: 1899, img: 'https://images.unsplash.com/photo-1507473888900-52e1adad54cd?w=200'},
        'vase': {title: 'Ceramic Vase', price: 899, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200'}
    };
    const item = products[id];
    const exists = cart.find(c => c.title === item.title);
    if(exists) exists.qty++; else cart.push({...item, qty: 1});
    saveToStorage(); toggleCart();
};

window.openCheckout = () => {
    if(cart.length === 0) return alert("Cart is empty!");
    toggleCart();
    document.getElementById('checkout-modal').classList.add('open');
};

window.closeCheckout = () => document.getElementById('checkout-modal').classList.remove('open');

window.processPayment = () => {
    const name = document.getElementById('cust-name').value;
    if(!name) return alert("Please enter your name!");

    document.getElementById('pay-btn-text').style.display = 'none';
    document.getElementById('pay-spinner').style.display = 'block';

    setTimeout(() => {
        const newOrder = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            date: new Date().toISOString(),
            items: [...cart],
            total: cart.reduce((s, i) => s + (i.price * i.qty), 0),
            customer: name
        };
        orders.push(newOrder);
        cart = [];
        saveToStorage();
        
        alert("Payment Successful! Order Placed.");
        document.getElementById('pay-btn-text').style.display = 'block';
        document.getElementById('pay-spinner').style.display = 'none';
        closeCheckout();
        showOrders();
    }, 1500);
};

window.showOrders = () => {
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('detail-view').classList.add('hidden');
    document.getElementById('orders-view').classList.remove('hidden');
    const cont = document.getElementById('orders-content');
    if(orders.length === 0) {
        cont.innerHTML = '<p class="text-center text-muted">No orders yet.</p>';
    } else {
        cont.innerHTML = orders.slice().reverse().map(o => `
            <div class="card mb-6" style="padding: 2rem; border: 1px solid #eee; margin-bottom: 1.5rem;">
                <div class="flex justify-between items-center mb-4">
                    <div><h3 class="font-bold">Order #${o.id}</h3><p class="text-sm text-muted">${new Date(o.date).toLocaleString()}</p></div>
                    <div class="text-brand font-bold text-xl">₹${o.total}</div>
                </div>
                <div style="border-top: 1px solid #eee; padding-top: 1rem;">
                    ${o.items.map(i => `<p class="text-sm">• ${i.title} (x${i.qty}) - ₹${i.price * i.qty}</p>`).join('')}
                </div>
            </div>`).join('');
    }
    window.scrollTo(0,0);
};

window.showHome = () => {
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('orders-view').classList.add('hidden');
    document.getElementById('detail-view').classList.add('hidden');
};

window.toggleCart = () => {
    document.getElementById('cart-drawer').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
};

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const itemsCont = document.getElementById('cart-items');
    badge.innerText = cart.length;
    badge.classList.toggle('show', cart.length > 0);
    
    if(cart.length === 0) {
        itemsCont.innerHTML = '<div class="text-center text-muted mt-4">Your cart is empty</div>';
    } else {
        itemsCont.innerHTML = cart.map(i => `
            <div class="flex justify-between items-center mb-4" style="border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">
                <div><strong>${i.title}</strong><br><small>₹${i.price} x ${i.qty}</small></div>
                <div class="font-bold">₹${i.price * i.qty}</div>
            </div>`).join('');
    }
    document.getElementById('cart-total').innerText = '₹' + cart.reduce((s, i) => s + (i.price * i.qty), 0);
}

// --- ANIMATION OBSERVER ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Initial UI Load
updateCartUI();

// Newsletter subscription handler
window.handleSubscribe = (e) => {
    e.preventDefault();
    const email = document.getElementById('subscribe-email').value;
    if(email) {
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        document.getElementById('subscribe-email').value = '';
    }
};

// Feedback form handler
window.handleFeedback = (e) => {
    e.preventDefault();
    
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const feedback = document.getElementById('user-feedback').value;

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address (e.g., user@example.com)');
        return;
    }

    // Store feedback in localStorage
    const feedbackData = {
        name: name,
        email: email,
        feedback: feedback,
        date: new Date().toISOString()
    };

    // Get existing feedback or create new array
    let allFeedback = JSON.parse(localStorage.getItem('urban_feedback')) || [];
    allFeedback.push(feedbackData);
    localStorage.setItem('urban_feedback', JSON.stringify(allFeedback));

    // Show success message
    document.getElementById('feedback-success-msg').style.display = 'block';
    
    // Reset form
    document.getElementById('feedback-form').reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('feedback-success-msg').style.display = 'none';
    }, 5000);
};
