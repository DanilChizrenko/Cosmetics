document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (res.status === 201) {
                alert('Регистрация прошла успешно!');
                window.location.href = 'login.html';
            } else {
                const errorText = await res.text();
                alert('Ошибка регистрации: ' + errorText);
            }
        } catch (err) {
            console.error('Ошибка при регистрации:', err);
            alert('Произошла ошибка при регистрации.');
        }
    });
});
