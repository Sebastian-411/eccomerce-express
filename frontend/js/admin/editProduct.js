editProductForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Token no encontrado. Por favor, inicie sesión.');
        return;
    }

    const productId = document.getElementById('productId').value;
    const name = document.getElementById('editName').value;
    const description = document.getElementById('editDescription').value;
    const price = document.getElementById('editPrice').value;
    const quantity = document.getElementById('editQuantity').value;
    const imageInput = document.getElementById('editImage');
    const imageFile = imageInput.files[0]; // Obtener el archivo adjunto

    // Crear un objeto FormData
    const formData = new FormData();

    // Agregar cada par clave-valor al objeto FormData
    formData.append('productId', productId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch(`http://localhost:3000/admin/products`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            alert('Producto actualizado exitosamente.');
            $('#editProductModal').modal('hide'); // Cerrar el modal después de actualizar
            // Puedes agregar más acciones aquí, como volver a cargar la lista de productos.
        } else {
            const errorMessage = await response.text();
            alert('Error al actualizar el producto: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Se produjo un error al intentar actualizar el producto.');
    }
});


async function getProductDetails(productId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/product/${productId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const productDetails = await response.json();
            document.getElementById('editName').value = productDetails.name;
            document.getElementById('editDescription').value = productDetails.description;
            document.getElementById('editPrice').value = productDetails.price;
            document.getElementById('editQuantity').value = productDetails.quantity;
        } else {
            const errorMessage = await response.text();
            alert('Error al obtener los detalles del producto: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Se produjo un error al intentar obtener los detalles del producto.');
    }
}




document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById('editProductModal');

    modal.addEventListener('shown.bs.modal', function () {
      const productId = document.getElementById('productId').value;
    
      getProductDetails(productId);
      });
  });
