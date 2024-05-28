// const { error } = require("console");

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

            if (response.ok) {
                const data = await response.json(); // aqui esta data es el token tienes que guardarlo para usarlo despues del registro
                if(data.success) {
                    alert(data.message);
                    window.location.href = "../../templates/auth/login_client.html";
                }else {
                    alert(data);
                }
            } else {
                const errorData = await response.json();
                alert(`Error en el registro: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error en el registro");
        }
    });
});

// document.getElementById('register-button').addEventListener('click', function(){
//     const username = document.getElementById('username-input').value;
//     const password = document.getElementById('password-input').value;

//     const user = {
//         username: username,
//         password: password,
//         rol: 'client'
//     };

//     fetch('http://localhost:3000/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('Registro exitoso');
//             window.location.href = '/login';
//         } else {
//             throw new Error('Error al hacer el registro');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Ocurrió un error durante el registro. Por favor, intenta nuevamente.');
//     });
// })
