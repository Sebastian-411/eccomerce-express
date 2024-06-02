const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded',async () => {
  const productCardsContainer = document.getElementById('productCardsCartContainer');

  // Hacer la solicitud a localhost:3000/cart
  fetch('http://localhost:3000/cart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de productos del carrito');
      }
      return response.json();
    })
    .then(products => {
      if (products.length === 0) {

        // Si no hay productos, mostrar el mensaje "No hay productos"
        const noProductsMessage = document.createElement('p');
        noProductsMessage.textContent = 'No hay productos en el carrito';
        noProductsMessage.style.textAlign = 'center';
        productCardsContainer.appendChild(noProductsMessage);
      } else {
        // Construir las tarjetas de producto
        products.forEach(product => {
          const globalProduct = await getProductById(product.id);
          let stockMessage = '';
          let imageClass = '';
          if (globalProduct.quantity === 0) {
            stockMessage = '<p class="text-danger">Sin stock</p>';
            imageClass = 'out-of-stock';
          }

          const productCard = document.createElement('div');
          productCard.className = 'card rounded-3 mb-4';
          productCard.innerHTML = `
            <div class="card-body p-4" id-prod="${product.id}">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
              <img src="data:image/jpeg;base64,${globalProduct.image}" class="img-fluid rounded-3 ${imageClass}" alt="${globalProduct.name}">
              ${stockMessage}
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">${product.name}</p>
                <p><span class="text-muted">${product.description}</span></p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button  data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2 decrease-quantity"
                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                  <i class="fas fa-minus "></i>
                </button>

                <input id="form1" min="0" name="quantity" value="${product.quantity}" type="number"
                  class="form-control form-control-sm quantity-input" disabled />

                <button  data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2 increase-quantity"
                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 price="${product.price}" class="mb-0 price">$${product.price * product.quantity}</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#" class="text-danger trash"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
            `;
          productCardsContainer.appendChild(productCard);

        });
        document.querySelectorAll('.increase-quantity').forEach(button => {
          button.addEventListener('click', () => {

            const cartItem = button.closest('.card-body');
            const productId = cartItem.getAttribute("id-prod")
            const price = cartItem.querySelector(".price")
            let quantityInput = cartItem.querySelector('.quantity-input');
            let quantity = parseInt(quantityInput.value);
            price.innerHTML = "$" + (parseInt(price.getAttribute("price")) * (parseInt(quantity)))
            quantity += 1;
            updateCart(productId, 1, quantity);
          });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
          button.addEventListener('click', () => {
            const cartItem = button.closest('.card-body');
            const productId = cartItem.getAttribute("id-prod")
            const price = cartItem.querySelector(".price")
            let quantityInput = cartItem.querySelector('.quantity-input');
            let quantity = parseInt(quantityInput.value);
            if (quantity >= 1) {
              price.innerHTML = "$" + (parseInt(price.getAttribute("price")) * (parseInt(quantity)))
              quantity -= 1;
              updateCart(productId, -1, quantity);
            } else if (quantity === 0) {
              productToDelete = { productId, cartItem };
              const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
              deleteModal.show();
              document.getElementById('confirmDelete').addEventListener('click', () => {
                if (productToDelete) {
                  updateCart(productId, -1, quantity)
                  deleteModal.hide()
                  window.location.reload()
                }
              });
              document.getElementById('dismiss').addEventListener('click', () => {
                quantityInput.value = 1;
                deleteModal.hide()
              });
            }
          });
        });
        document.querySelectorAll('.trash').forEach(button => {
          button.addEventListener('click', () => {
            const cartItem = button.closest('.card-body');
            const productId = cartItem.getAttribute("id-prod")
            let quantityInput = cartItem.querySelector('.quantity-input');
            let quantity = parseInt(quantityInput.value);
            productToDelete = { productId, cartItem };
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
            deleteModal.show();
            document.getElementById('confirmDelete').addEventListener('click', () => {
              if (productToDelete) {
                updateCart(productId, -quantity, quantity)
                deleteModal.hide()
                window.location.reload()
              }
            });
            document.getElementById('dismiss').addEventListener('click', () => {
              quantityInput.value = quantity;
              deleteModal.hide()
            });

          });
        });


        const buttons = document.createElement('div');
        buttons.className = 'card'
        buttons.innerHTML = `
          <div class="card-body">
          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-warning btn-block btn-lg" id="purchase">Proceed to Pay</button>
          <a href="index.html"><button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-secondary btn-block btn-lg">Continue Shopping</button></a>
        </div>`
        productCardsContainer.appendChild(buttons);
        const button = document.querySelector('#purchase')
        const token = localStorage.getItem('token');
        button.addEventListener('click', async () => {
          try {
            const response = await fetch('http://localhost:3000/cart/purchase', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            });

            if (response.ok) {
              const purchaseDetails = await response.json();
              console.log(purchaseDetails)
              const modalBody = document.querySelector('#purchaseModal .modal-body');
              modalBody.innerHTML = `
              <p>Compra realizada exitosamente.</p>
              <p><strong>ID de Compra:</strong> ${purchaseDetails.id}</p>
              <p><strong>Fecha:</strong> ${new Date(purchaseDetails.date).toLocaleString()}</p>
              <p><strong>Total:</strong> $${purchaseDetails.totalPrice.toFixed(2)}</p>
              <p><strong>Productos:</strong></p>
              <ul class="list-group">
                ${purchaseDetails.products.map(product => `
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6>${product.name}</h6>
                      <small class="text-muted">Cantidad: ${product.quantity}</small>
                    </div>
                    <span class="badge bg-primary rounded-pill">$${(parseInt(product.quantity) * parseInt(product.price)).toFixed(2)}</span>
                  </li>
                `).join('')}
              </ul>
            `;
              $('#purchaseModal').modal('show');

              let receiptHTML = `
              <h1>Recibo de compra</h1>
              <p><strong>ID de Compra:</strong> ${purchaseDetails.id}</p>
              <p><strong>Fecha:</strong> ${new Date(purchaseDetails.date).toLocaleString()}</p>
              <p><strong>Total:</strong> $${purchaseDetails.totalPrice.toFixed(2)}</p>
              <p><strong>Productos:</strong></p>
              <ul>
                ${purchaseDetails.products.map(product => `
                  <li>${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}</li>
                `).join('')}
              </ul>
            `;

              // Abrir una nueva ventana y establecer su contenido como el HTML del recibo
              const receiptWindow = window.open('');
              receiptWindow.document.open();
              receiptWindow.document.write(receiptHTML);
              receiptWindow.document.close();
              
              // Esperar un breve momento para asegurarse de que el contenido se ha cargado completamente
              setTimeout(() => {

                receiptWindow.print();

                receiptWindow.close();
              }, 1000); // Ajusta el tiempo de espera según sea necesario


              document.getElementById('modalAcceptButton').addEventListener('click', () => {
                window.location.reload();
              });

            } else {
              response.text().then(function (mensaje) {
                alert(mensaje)
              });
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejar errores aquí
    });

});

async function updateCart(productId, quantity, quantityInput) {
  const id = parseInt(productId)
  try {
    const response = await fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: id, quantity: quantity })
    });

    if (response.ok) {

    } else {
      console.error('Error actualizando el carrito:', response.statusText);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

async function getProductById(productId) {
  const response = await fetch(`/product/${productId}`);
  if (!response.ok) {
    throw new Error('Producto no encontrado');
  }
  const product = await response.json();
  return product;
}


