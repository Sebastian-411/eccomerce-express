document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;

        const user = {
            username: username,
            password: password,
            rol: 'client'
        };
        try {
            const response = await fetch("http://localhost:3000/register", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            
            const data = await response.json();
            const messageContainer = document.getElementById('message-container');
            messageContainer.innerHTML = '';
            const messageElement = document.createElement('p');
            messageElement.className = data.success ? 'alert-success' : 'alert-danger';
            messageElement.innerText = data.message;
            messageContainer.appendChild(messageElement);
            if (data.success) {
                setTimeout(() => {
                    window.location.href = "../../templates/auth/login_client.html";
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error en el registro");
        }
    });
});
   
