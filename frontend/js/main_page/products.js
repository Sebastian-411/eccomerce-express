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
          let stockMessage = '';
          if (product.quantity === 0) {
            stockMessage = '<p class="text-danger">Sin stock</p>';
          }
          
          productCard.innerHTML = `
            <div class="product-card position-relative">
              <div class="image-holder">
                <img src="data:image/jpeg;base64,${product.image}" alt="product-item" class="img-fluid">
              </div>
              <div class="cart-concern position-absolute">
                <div class="cart-button d-flex">
                  <a href="#" class="btn btn-medium btn-black add-to-cart" data-product-id="${product.id}" ${product.quantity === 0 ? 'style="display:none;"' : ''}>Add to Cart
                    <svg class="cart-outline">
                      <use xlink:href="#cart-outline"></use>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                <h3 class="card-title text-uppercase">
                  <a href="#">${product.name}</a>
                </h3>
                <span class="item-price text-primary">$${product.price}</span>
              </div>
              <p>${product.description}</p>
              ${stockMessage}
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
                }else{
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
