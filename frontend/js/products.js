document.addEventListener('DOMContentLoaded', () => {
    const productCardsContainer = document.getElementById('productCardsContainer');

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
                    <a href="#" class="btn btn-medium btn-black">Add to Cart<svg class="cart-outline">
                        <use xlink:href="#cart-outline"></use>
                      </svg></a>
                  </div>
                </div>
                <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                  <h3 class="card-title text-uppercase">
                    <a href="#">${product.name}</a>
                  </h3>
                  <span class="item-price text-primary">$${product.price}</span>
                </div>
                <p>${product.description}</p>
              </div>
            `;
            productCardsContainer.appendChild(productCard);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Manejar errores aquí
      });
  });
