const categories = {
    fashion: ['womens-dresses', 'mens-shirts', 'tops', 'womens-shoes', 'mens-shoes', 'womens-bags', 'womens-jewellery'],
    home: ['furniture', 'home-decoration', 'kitchen-accessories'],
    electronics: ['smartphones', 'laptops', 'tablets', 'mobile-accessories'],
    watches: ['mens-watches', 'womens-watches'],
    sports: ['sports-accessories'],
    skincare: ['skin-care', 'beauty'],
    sunglasses: ['sunglasses'],
    vehicles: ['motorcycle', 'vehicle'],
    fragrances: ['fragrances'],
    accessories: ['womens-bags', 'womens-jewellery', 'sunglasses']
};

// --- PRODUCTS FETCHING ---
async function fetchCategory(key) {
    try {
        const urls = categories[key].map(cat =>
            fetch(`https://dummyjson.com/products/category/${cat}?limit=0`)
        );
        const responses = await Promise.all(urls);
        const data = await Promise.all(responses.map(r => r.json()));
        const products = data.flatMap(d => d.products);

        const block = document.querySelector(`.category-block[data-cat="${key}"]`);
        if (!block) return;

        const grid = block.querySelector('.products-grid');
        const template = grid.querySelector('.card');

        products.forEach((p, i) => {
            const card = template.cloneNode(true);
            card.dataset.id = p.id;
            card.dataset.price = p.price;

            const img = card.querySelector('img');
            img.src = p.thumbnail;
            img.alt = p.title;

            card.querySelector('h4').textContent = p.title;
            card.querySelector('.price').textContent = '$' + p.price;

            // Initially hide products after the first 6
            if (i >= 6) card.classList.add('hidden-card');

            grid.appendChild(card);
        });
        template.remove(); // Remove the empty template card
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Initialize categories
Object.keys(categories).forEach((key, i) => {
    fetchCategory(key);
    // Show only first 4 categories on start (See More logic)
    if (i >= 4) {
        const block = document.querySelector(`.category-block[data-cat="${key}"]`);
        if (block) block.style.display = 'none';
    }
});

// --- UI LOGIC ---

// Tabs Filter
function filterCategory(cat, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.category-block').forEach(b => {
        b.style.display = (cat === 'all' || b.dataset.cat === cat) ? 'block' : 'none';
    });
}

// See More Button (Footer ke upar wala)
function toggleCategories(btn) {
    const blocks = document.querySelectorAll('.category-block');
    const isShowingMore = btn.textContent === 'See More';

    blocks.forEach((b, i) => {
        if (i >= 4) b.style.display = isShowingMore ? 'block' : 'none';
    });
    btn.textContent = isShowingMore ? 'See Less' : 'See More';
}

// View All Button (Inside each category)
function viewAll(btn) {
    const block = btn.closest('.category-block');
    const hiddenCards = block.querySelectorAll('.hidden-card');
    hiddenCards.forEach(c => {
        c.style.display = 'block';
        c.classList.remove('hidden-card');
    });
    btn.style.display = 'none';
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('closeBtn');

hamburger?.addEventListener('click', () => menu.classList.add('open'));
closeBtn?.addEventListener('click', () => menu.classList.remove('open'));

// --- CART SYSTEM ---
let cart = JSON.parse(localStorage.getItem('myshop-cart')) || [];

function saveCart() {
    localStorage.setItem('myshop-cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    // Header count
    const count = cart.reduce((acc, i) => acc + i.quantity, 0);
    const cartBtnText = document.querySelector('.cart-text');
    if (cartBtnText) cartBtnText.textContent = `Add to Cart (${count})`;

    // Sidebar items
    const container = document.getElementById('cartItems');
    if (!container) return;

    const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px;">Cart is empty.</p>';
        document.getElementById('cartTotal').textContent = '';
        return;
    }

    container.innerHTML = cart.map(i => `
        <div class="cart-item">
            <img src="${i.thumbnail}">
            <div class="cart-item-info">
                <p class="cart-title">${i.title}</p>
                <p class="cart-price">$${i.price}</p>
                <div class="cart-qty">
                    <button onclick="changeQty('${i.id}', -1)">−</button>
                    <span>${i.quantity}</span>
                    <button onclick="changeQty('${i.id}', 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${i.id}')">Remove</button>
            </div>
        </div>`).join('');

    document.getElementById('cartTotal').innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id != id);
    saveCart();
}

function changeQty(id, change) {
    const item = cart.find(i => i.id == id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(id);
        else saveCart();
    }
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').style.display = 'none';
}

document.getElementById('cartBtn')?.addEventListener('click', openCart);

// --- SEARCH ---
function searchProducts() {
    const query = document.querySelector('.srch').value.toLowerCase().trim();
    const blocks = document.querySelectorAll('.category-block');

    blocks.forEach(block => {
        let hasMatch = false;
        block.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'block';
                hasMatch = true;
            } else {
                card.style.display = 'none';
            }
        });
        block.style.display = hasMatch ? 'block' : 'none';
    });
}

//  Add to Cart
document.getElementById('shopSection').addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card && (e.target.classList.contains('btn-cart') || e.target.classList.contains('btn-shop'))) {
        const product = {
            id: card.dataset.id,
            title: card.querySelector('h4').textContent,
            price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
            thumbnail: card.querySelector('img').src
        };
        addToCart(product);
    }
});

updateCartUI();
