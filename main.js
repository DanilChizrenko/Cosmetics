document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('products');
    const details = document.getElementById('product-details');
    const allProducts = [];
    const categoryItems = document.querySelectorAll('.category-list li');

    fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            allProducts.push(...data);
            renderProducts(data);
        });

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.category-list li.active')?.classList.remove('active');
            item.classList.add('active');
            const category = item.dataset.category;
            const filtered = category === 'all' ? allProducts : allProducts.filter(p => p.category === category);
            renderProducts(filtered);
        });
    });

    function renderProducts(products) {
        container.innerHTML = '';
        details.innerHTML = '';
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.price} ₽</p>
            `;
            div.addEventListener('click', () => {
                details.innerHTML = `
                    <div class="product-details">
                        <button class="close-btn">✖</button>
                        <img src="${product.image_url}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>${product.price} ₽</p>
                        <p>Подробное описание товара: отличный выбор для вашей красоты и ухода.</p>
                        <button class="add-to-cart">Добавить в корзину</button>
                    </div>
                `;

                document.querySelector('.close-btn').addEventListener('click', () => {
                    details.innerHTML = '';
                });

                document.querySelector('.add-to-cart').addEventListener('click', () => {
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cart.push(product);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert('Товар добавлен в корзину');
                });
            });
            container.appendChild(div);
        });
    }
});
