async function checkTokenAndRedirect() {
    const token = localStorage.getItem('token');
    if (!token) {
        redirectToLogin();
        return;
    }
    await authToken(token);
}

document.addEventListener('DOMContentLoaded', async () => {
    checkTokenAndRedirect();
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
        const basePath = window.location.pathname.includes('admin') ? '../' : '';
        if (userInfo.rol === "admin" && !window.location.pathname.includes('admin/index.html')) {
            window.location.replace(`${basePath}admin/index.html`);
        } else if (userInfo.rol === "client" && !window.location.pathname.includes('index.html')) {
            window.location.replace(`${basePath}index.html`);
        }
    } else {
        alert('Unexpected error');
    }
}

function logOut() {
    localStorage.removeItem('token');
    redirectToLogin();
}

function redirectToLogin() {
    const basePath = window.location.pathname.includes('admin') ? '../' : '';
    window.location.href = `${basePath}login.html`;
}
