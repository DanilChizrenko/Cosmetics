document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');

    function renderCart() {
        container.innerHTML = '';
        cartItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.name} - ${item.price} ₽</span>
                <button data-index="${index}">Удалить</button>
            `;
            container.appendChild(div);
        });

        document.querySelectorAll('.cart-item button').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                renderCart();
            });
        });
    }

    renderCart();
});