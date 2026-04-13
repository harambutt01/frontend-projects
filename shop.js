//  Menu Toggle 
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "block";
  }
});

//  Cart Setup 
let cart = JSON.parse(localStorage.getItem("myshop-cart")) || [];

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const closeCartBtn = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const container = document.getElementById("productContainer");

// Cart Open/Close 
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
  renderCart();
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

// Load Products 
async function loadProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  data.products.map((product) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h4");
    const price = document.createElement("p");
    const btn = document.createElement("button");

    card.classList.add("product");
    img.src = product.thumbnail;
    img.alt = product.title;
    title.textContent = product.title;
    price.textContent = `$${product.price}`;
    btn.textContent = "Add to Cart";
    btn.classList.add("add-to-cart");

    btn.addEventListener("click", () => {
      addToCart(product);
      btn.textContent = "✔ Added!";
      btn.style.backgroundColor = "#808080";
      card.
// button again normal in 1sec
        setTimeout(() => {
          btn.textContent = "Add to Cart";
          btn.style.backgroundColor = "";

        }, 1000);
    });

    card.append(img, title, price, btn);
    container.appendChild(card);
  });
}

loadProducts();

//  Add to Cart
function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  renderCart();
}
// Remove from Cart 
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartCount();
  renderCart();
}

//  Save Cart 
function saveCart() {
  localStorage.setItem("myshop-cart", JSON.stringify(cart));
}

//  Cart Count 
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartBtn.textContent = `🛒 Cart (${count})`;
}

//  Render Cart 
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.textContent = "Your cart is empty.";
    cartTotalEl.textContent = "";
    return;
  }

  cart.map((item) => {
    const row = document.createElement("div");
    const img = document.createElement("img");
    const info = document.createElement("div");
    const name = document.createElement("p");
    const qty = document.createElement("p");
    const total = document.createElement("p");
    const removeBtn = document.createElement("button");

    row.classList.add("cart-item");
    img.src = item.thumbnail;
    img.alt = item.title;
    name.textContent = item.title;
    qty.textContent = `Qty: ${item.quantity}`;
    total.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    removeBtn.textContent = "✕";
    removeBtn.classList.add("remove-btn");

    removeBtn.addEventListener("click", () => removeFromCart(item.id));

    info.append(name, qty, total);
    row.append(img, info, removeBtn);
    cartItemsContainer.appendChild(row);
  });

  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotalEl.textContent = `Total: $${grandTotal.toFixed(2)}`;
}

// 
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return alert("Your cart is empty!");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  alert(` Thank you!\nTotal: $${total.toFixed(2)}`);

  cart = [];
  saveCart();
  updateCartCount();
  renderCart();
  cartSidebar.classList.remove("active");
});

// Search 
function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  document.querySelectorAll(".product").forEach((card) => {
    const title = card.querySelector("h4").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "flex" : "none";
  });
}

document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchProducts();
});


updateCartCount();