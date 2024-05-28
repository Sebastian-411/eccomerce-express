document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    const user = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();
      const messageContainer = document.getElementById('message-container');
      messageContainer.innerHTML = '';
      if(data.success) {
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          window.location.href = "../../index.html";
        }, 2000);
      }else {
        const messageElement = document.createElement('p');
        messageElement.className = 'alert-danger';
        messageElement.innerText = data.message;
        messageContainer.appendChild(messageElement);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el login");
    }
  });
});

