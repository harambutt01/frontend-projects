async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products?limit=8')
    const data = await response.json()

    const container = document.getElementById('container')
    const template = document.querySelector('.card')

    for (let i = 0; i < data.products.length; i++) {
        const card = template.cloneNode(true)
        card.querySelector('img').src = data.products[i].thumbnail
        card.querySelector('img').alt = data.products[i].title
        card.querySelector('h3').textContent = data.products[i].title
        card.querySelectorAll('p')[0].textContent = data.products[i].description.split(' ').slice(0, 20).join(' ')+ '.....'
        card.querySelectorAll('p')[1].textContent = "$" + data.products[i].price
        container.appendChild(card)
    }

    template.remove()
}

fetchProducts()

const hamburger = document.getElementById('hamburger')
const menu = document.getElementById('menu')
const closeBtn = document.getElementById('closeBtn')  

hamburger.addEventListener('click', () => {
    menu.classList.toggle('open')
    closeBtn.style.display = 'block'  
})

closeBtn.addEventListener('click', () => {
    menu.classList.remove('open')
    closeBtn.style.display = 'none'  
})


