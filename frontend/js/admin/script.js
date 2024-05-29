document.addEventListener('DOMContentLoaded', () => {
  const productCardsContainer = document.getElementById('productCardsContainer');
  let productId = null;
  // Hacer la solicitud a localhost:3000/products
  fetch('http://localhost:3000/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de productos');
      }
      return response.json();
    })
    .then(products => {
      if (products.length === 0) {
        // Si no hay productos, mostrar el mensaje "No hay productos"
        const noProductsMessage = document.createElement('p');
        noProductsMessage.textContent = 'No hay productos';
        noProductsMessage.style.textAlign = 'center';
        productCardsContainer.appendChild(noProductsMessage);
      } else {
        // Construir las tarjetas de producto
        products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.className = 'col-lg-3 col-md-6 pb-3 pt-5';
          productCard.innerHTML = `
                <div class="product-card position-relative">
                  <div class="image-holder">
                  <img src="data:image/jpeg;base64,${product.image}" alt="product-item" class="img-fluid">
                  </div>
                  <div class="cart-concern position-absolute">
                    <div class="cart-button d-flex">
                      <button onclick="updateId(${product.id})" type="button" class="btn btn-medium btn-black edit-product" data-bs-toggle="modal" data-bs-target="#editProductModal" data-product-id="${product.id}">Editar Producto</button>
                    </div>
                  </div>
                
  
              
                  <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 class="card-title text-uppercase">
                      <a href="#">${product.name}</a>
                    </h3>
                    <span class="item-price text-primary">$${product.price}</span>
                  </div>


                  <p>${product.description}</p>

                  <div class="card-detail d-flex justify-content-between align-items-baseline">
                  <h5 class="">
                    <p>Cantidad: <span class="item-price text-primary">${product.quantity}</span>
                    </p>
                  </h5>
                </div>
                </div>
              `;
          productCardsContainer.appendChild(productCard);
        });
        const cartButtons = document.querySelectorAll('.add-to-cart');
        cartButtons.forEach(button => {
          button.addEventListener('click', async (event) => {
            productId = button.getAttribute('data-product-id');
            event.preventDefault();
            const myModal = new bootstrap.Modal(document.getElementById("myModal"));
            myModal.show();
          });
        });
        const acceptButton = document.getElementById("acceptButton");
        const quantityInput = document.getElementById("quantityInput");
        acceptButton.addEventListener("click", async (event) => {
          const quantity = quantityInput.value;
          if (quantity && quantity > 0) {
            const myModalEl = document.getElementById("myModal");
            const myModal = bootstrap.Modal.getInstance(myModalEl);
            myModal.hide();
            if (productId) {
              const id = parseInt(productId);
              try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/cart', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json" // Suponiendo que el token está almacenado en localStorage
                  },
                  body: JSON.stringify({ productId: id, quantity: quantity })
                });
                if (response.ok) {
                  alert('Producto añadido al carrito');
                } else {
                  alert(error)
                }
              } catch (error) {
                console.error('Error al añadir el producto al carrito:', error);
                alert('Hubo un problema al añadir el producto al carrito. Inténtalo de nuevo.');
              }
            } else {
              alert('ID de producto no encontrado');
            }
          } else {
            alert("Por favor ingrese una cantidad válida");
          }
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      console.log(error.name)


      // Manejar errores aquí
    });


});



function updateId(id){
  const element = document.getElementById('productId');
  element.value = id;
  console.log(element.value)
}