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
                            <p>Подробное описание товара: отличный выбор для вашей красоты и ухода.</p>
                            <button>Добавить в корзину</button>
                        </div>
                    `;

                    const closeBtn = document.querySelector('.close-btn');
                    closeBtn.addEventListener('click', () => {
                        details.innerHTML = '';
                    });
                });

                container.appendChild(div);
            });
        });
});
