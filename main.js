document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('products');
            const details = document.getElementById('product-details');

            data.forEach(product => {
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
                            <p>отличный выбор для вашей красоты и ухода</p>
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
        });
});