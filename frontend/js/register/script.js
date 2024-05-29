document.getElementById('registerButton').addEventListener('click', async () => {
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
        const response = await fetch('http://localhost:3000/register', {
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
            alert('Registration successful! Please login.');
            window.location.replace('login.html');
        } else {
            alert(result.error || 'Registration failed');
        }
    } catch (error) {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

