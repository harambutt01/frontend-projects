// contact.js

// Menu Toggle
let menuBtn = document.getElementById("menuBtn");
let navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "block";
  }
});

// cart click krny par product show krwao
let cartBtn = document.getElementById("cartBtn");
let cart = JSON.parse(localStorage.getItem("myshop-cart")) || [];
let count = cart.reduce((acc, item) => acc + item.quantity, 0);
cartBtn.textContent = `🛒 Add to Cart (${count})`;

