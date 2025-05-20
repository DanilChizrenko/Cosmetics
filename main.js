document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('products');
            const modal = document.getElementById('modal');
            const modalImage = document.getElementById('modal-image');
            const modalName = document.getElementById('modal-name');
            const modalPrice = document.getElementById('modal-price');
            const modalDescription = document.getElementById('modal-description');
            const modalClose = document.getElementById('modal-close');
            const addToCartButton = document.getElementById('add-to-cart');

            data.forEach(product => {
                const div = document.createElement('div');
                div.className = 'product';
                div.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}" width="100">
                    <h2>${product.name}</h2>
                    <p>${product.price} ₽</p>
                `;
                div.addEventListener('click', () => {
                    modalImage.src = product.image_url;
                    modalName.textContent = product.name;
                    modalPrice.textContent = `${product.price} ₽`;
                    modalDescription.textContent = `Подробное описание товара: ${product.name}.`; // заглушка
                    modal.classList.remove('hidden');
                });
                container.appendChild(div);
            });

            modalClose.addEventListener('click', () => {
                modal.classList.add('hidden');
            });

            window.addEventListener('click', e => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });

            addToCartButton.addEventListener('click', () => {
                alert('Товар добавлен в корзину!');
            });
        });
});
