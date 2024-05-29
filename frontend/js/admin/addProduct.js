document.addEventListener('DOMContentLoaded', function () {
    const addProductForm = document.getElementById('addProductForm');
  
    addProductForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token no encontrado. Por favor, inicie sesión.');
        return;
      }
  
      const formData = new FormData(addProductForm);
      try {
        const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
  
        if (response.ok) {
          alert('Producto agregado exitosamente.');
          location.reload();
        } else {
          const errorMessage = await response.text();
          alert('Error al agregar el producto: ' + errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Se produjo un error al intentar agregar el producto.');
      }
    });
  });
  