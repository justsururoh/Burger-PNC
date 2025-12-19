/* =========================
   EMAILJS INITIALIZATION
========================= */
(function () {
  emailjs.init("bPcVmMGJSdBMPeawi")
})()

const EMAILJS_SERVICE_ID = "service_erodzig"
const EMAILJS_TEMPLATE_ID = "template_7jvuiew"

/* =========================
   NAV MENU TOGGLE
========================= */
const menu = document.querySelector("#menu-icon")
const navList = document.querySelector(".navdiv ul")

if (menu && navList) {
  menu.onclick = () => {
    menu.classList.toggle("bx-x")
    navList.classList.toggle("active")
  }

  window.onscroll = () => {
    menu.classList.remove("bx-x")
    navList.classList.remove("active")
  }
}

/* =========================
   PRODUCTS DATA
========================= */
const products = [
  { id: 1, name: "Pesto Turkey Burger", price: 15, image: "image/pesto-turkey-burger.png", category: "gourmet" },
  { id: 2, name: "Bacon Lover's Burger", price: 13, image: "image/bacon-lovers-burger.png", category: "classic" },
  { id: 3, name: "Mushroom Swiss Burger", price: 20, image: "image/mushroom-swiss-burger.png", category: "gourmet" },
  { id: 4, name: "BBQ Ranch Burger", price: 18, image: "image/bbq-ranch-burger.png", category: "specialty" },
  { id: 5, name: "Caprese Burger", price: 13, image: "image/caprese-burger.png", category: "gourmet" },
  { id: 6, name: "PNC Veggie Delight", price: 10, image: "image/tnc-vegggie-delight.png", category: "veggie" },
  { id: 7, name: "PNC Heaven Burger", price: 24, image: "image/tnc-heaven-burger.png", category: "specialty" },
  { id: 8, name: "Classic Cheeseburger", price: 12, image: "image/pesto-turkey-burger-2.png", category: "classic" },
  // Sides
  { id: 9, name: "Classic French Fries", price: 4, image: "image/classic-french-fries.jpg", category: "sides" },
  { id: 10, name: "Sweet Potato Fries", price: 5, image: "image/sweet-potato-fries.jpg", category: "sides" },
  { id: 11, name: "Onion Rings", price: 5.5, image: "image/onion-rings.jpg", category: "sides" },
  { id: 12, name: "Loaded Cheese Fries", price: 7, image: "image/loaded-cheese-fries.jpg", category: "sides" },
  // Drinks
  { id: 13, name: "Soft Drinks", price: 2.5, image: "image/soft-drinks.jpg", category: "drinks" },
  { id: 14, name: "Fresh Lemonade", price: 3.5, image: "image/fresh-lemonade.jpg", category: "drinks" },
  { id: 15, name: "Milkshakes", price: 6, image: "image/milkshakes.jpg", category: "drinks" },
  { id: 16, name: "Iced Coffee", price: 4, image: "image/iced-coffee.jpg", category: "drinks" },
  // Desserts
  { id: 17, name: "Chocolate Brownie", price: 6, image: "image/chocolate-brownie.jpg", category: "desserts" },
  { id: 18, name: "Apple Pie", price: 5.5, image: "image/apple-pie.jpg", category: "desserts" },
  { id: 19, name: "Ice Cream Sundae", price: 7, image: "image/ice-cream-sundae.jpg", category: "desserts" },
]

/* =========================
   CART LOGIC
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || []

function updateCartCount() {
  const count = cart.reduce((t, i) => t + i.quantity, 0)
  document.querySelectorAll("#cart-count").forEach(el => (el.textContent = count))
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId)
  if (!product) return

  const item = cart.find(i => i.id === productId)
  item ? (item.quantity += 1) : cart.push({ ...product, quantity: 1 })

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  loadCartItems()
}

function updateQuantity(productId, change) {
  const item = cart.find(i => i.id === productId)
  if (!item) return

  item.quantity += change
  if (item.quantity <= 0) removeFromCart(productId)
  else {
    localStorage.setItem("cart", JSON.stringify(cart))
    loadCartItems()
  }
}

/* =========================
   SHOP PAGE
========================= */
function loadShopProducts(category = "all") {
  const container = document.getElementById("shop-products")
  if (!container) return

  const burgerCategories = ["gourmet", "classic", "specialty", "veggie"]
  let filtered

  if (category === "all") {
    filtered = products.filter(p => burgerCategories.includes(p.category))
  } else {
    filtered = products.filter(p => p.category === category)
  }

  container.innerHTML = filtered
    .map(
      p => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price.toFixed(2)}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `
    )
    .join("")
}

function setupShopFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"))
      btn.classList.add("active")
      loadShopProducts(btn.dataset.category)
    })
  })
}

// MENU PAGE
function loadMenuBurgers() {
  const container = document.getElementById("menu-burgers")
  if (!container) return

  const burgers = products.filter(p => ["gourmet", "classic", "specialty", "veggie"].includes(p.category))
  container.innerHTML = burgers.map(p => `
    <div class="menu-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("")
}

function loadMenuItems(category) {
  const container = document.getElementById(`${category}-container`)
  if (!container) return
  const items = products.filter(p => p.category === category)

  container.innerHTML = items
    .map(
      p => `
    <div class="menu-card">
      <img src="${p.image}" alt="${p.name}">
      <div class="menu-card-body">
        <h3>${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `
    )
    .join("")
}

function setupMenuCategories() {
  const buttons = document.querySelectorAll(".menu-category-btn")
  const sections = document.querySelectorAll(".menu-section")

  if (!buttons.length || !sections.length) return

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active button
      buttons.forEach(b => b.classList.remove("active"))
      btn.classList.add("active")

      const category = btn.dataset.category

      // Hide all sections
      sections.forEach(section => section.classList.add("hidden"))

      // Show selected section
      const activeSection = document.getElementById(`${category}-section`)
      if (activeSection) activeSection.classList.remove("hidden")

      // Load items if this is sides, drinks, or desserts
      if (category !== "burgers") {
        loadMenuItems(category)
      }
    })
  })
}


/* =========================
   CART PAGE
========================= */
function loadCartItems() {
  const itemsContainer = document.getElementById("cart-items")
  if (!itemsContainer) return

  if (cart.length === 0) {
    itemsContainer.innerHTML = ""
    document.getElementById("empty-cart").style.display = "block"
    return
  }

  document.getElementById("empty-cart").style.display = "none"

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const tax = (subtotal + deliveryFee) * 0.075
  const total = subtotal + deliveryFee + tax

  itemsContainer.innerHTML = cart
    .map(
      item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `
    )
    .join("")

  // Update order summary
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`
  document.getElementById("total").textContent = `$${total.toFixed(2)}`
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const orderSummary = cart.map(item => `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`).join("\n")

  const message = `Order Confirmed!\n\n${orderSummary}\n\nTotal: $${total.toFixed(2)}\n\nThank you for your purchase!`
  alert(message)

  // Clear cart
  cart = []
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  loadCartItems()
}

/* =========================
   CONTACT FORM (EMAILJS)
========================= */
function setupContactForm() {
  const form = document.getElementById("contact-form")
  if (!form) return

  const messageBox = document.getElementById("form-message")
  const submitBtn = form.querySelector(".submit-btn")

  form.addEventListener("submit", e => {
    e.preventDefault()
    submitBtn.disabled = true
    submitBtn.textContent = "Sending..."

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(
        () => {
          messageBox.textContent = "Message sent successfully!"
          messageBox.style.color = "#f17127"
          form.reset()
        },
        error => {
          console.error(error)
          messageBox.textContent = "Failed to send message."
          messageBox.style.color = "red"
        }
      )
      .finally(() => {
        submitBtn.disabled = false
        submitBtn.textContent = "Send Message"
      })
  })
}

/* =========================
   NEWSLETTER
========================= */
function subscribeNewsletter() {
  const email = document.getElementById("email")
  const msg = document.getElementById("subscribe-message")

  if (!email.value) {
    msg.textContent = "Please enter a valid email."
    msg.style.color = "red"
    return
  }

  msg.textContent = "Thank you for subscribing!"
  msg.style.color = "#f17127"
  email.value = ""
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  loadShopProducts()
  loadMenuBurgers()
  setupMenuCategories()
  setupShopFilters()
  loadCartItems()
  setupContactForm()
})
