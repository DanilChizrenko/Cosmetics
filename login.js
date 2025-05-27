document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert(errorText);
                return;
            }

            const user = await response.json();

            localStorage.setItem('user', JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            }));

            window.location.href = 'account.html';
        } catch (err) {
            console.error('Ошибка при входе:', err);
            alert('Произошла ошибка');
        }
    });
});
