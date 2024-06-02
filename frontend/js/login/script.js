
document.getElementById('loginButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    // Show loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'flex';

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        // Hide loading spinner
        loadingSpinner.style.display = 'none';

        if (response.ok) {
            if (result.token) {
                localStorage.setItem('token', result.token);

                await authToken(result.token);
            } else {
                alert('Unexpected response format');
            }
        } else {
            alert('user does not exist');
        }
    } catch (error) {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});


async function authToken(token) {
    const responseToken = await fetch('http://localhost:3000/whoami', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const userInfo = await responseToken.json();

    if (responseToken.ok) {
        if (userInfo.rol === "admin") {
            window.location.replace('admin/index.html');
        } else if (userInfo.rol === "client") {
            window.location.replace('index.html');
        } else {
            alert('Role not recognized');
        }
    } else {
        alert('Unexpected error');
    }
}

