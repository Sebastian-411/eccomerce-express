document.addEventListener('DOMContentLoaded', () => {
  const productCardsContainer = document.getElementById('productCardsCartContainer');


  // Hacer la solicitud a localhost:3000/cart
  fetch('http://localhost:3000/cart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 887f2d243f55dabcfadb2050656ad69079af70672b2c6a45cced0491881652d0', // Suponiendo que el token está almacenado en localStorage
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

          const productCard = document.createElement('div');
          productCard.className = 'card rounded-3 mb-4';
          productCard.innerHTML = `
            <div class="card-body p-4" id-prod="${product.id}">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="data:image/jpeg;base64,${product.image}"
                  class="img-fluid rounded-3" alt="Cotton T-shirt">
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
                <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
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
            quantity +=1;
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
        const buttons = document.createElement('div');
        buttons.className = 'card'
        buttons.innerHTML = `
          <div class="card-body">
          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
          <a href="index.html"><button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-secondary btn-block btn-lg">Continue Shopping</button></a>
        </div>`
        productCardsContainer.appendChild(buttons);
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
        'Authorization': 'Bearer 887f2d243f55dabcfadb2050656ad69079af70672b2c6a45cced0491881652d0',
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


