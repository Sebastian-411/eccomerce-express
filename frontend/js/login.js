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

      if (response.ok) {
        const data = await response.json(); // aqui esta data es el token tienes que guardarlo para usarlo despues del registro
        if (data.success) {
          alert(data.message);
          window.location.href = "../../index.html";
        } else {
          alert(data.message);
        }
      } else {
        const errorData = await response.json();
        alert(`Error en el login: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el login");
    }
  });
});

