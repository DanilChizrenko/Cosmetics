document.addEventListener("DOMContentLoaded", () => {
    fetch("products.json") // Загружаем JSON-файл
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("products");
            data.forEach(product => {
                let div = document.createElement("div");
                div.classList.add("product");
                div.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.price} ₽</p>
                    <img src="${product.image_url}" alt="${product.name}" width="100">
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error("Ошибка загрузки товаров:", error));
});
