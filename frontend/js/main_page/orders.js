document.addEventListener('DOMContentLoaded', () => {
    const ordersCardsContainer = document.getElementById('ordersCardsContainer');

    // Hacer la solicitud a localhost:3000/orders
    fetch('http://localhost:3000/purchases', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de pedidos');
            }
            return response.json();
        })
        .then(orders => {
            if (orders.length === 0) {
                // Si no hay pedidos, mostrar el mensaje "No hay pedidos"
                const noOrdersMessage = document.createElement('p');
                noOrdersMessage.textContent = 'No hay pedidos';
                noOrdersMessage.style.textAlign = 'center';
                ordersCardsContainer.appendChild(noOrdersMessage);
            } else {
                // Construir las tarjetas de pedidos
                orders.forEach(order => {
                    const orderCard = document.createElement('div');
                    orderCard.className = 'col-lg-3 col-md-6 pb-3 pt-5';
                    orderCard.innerHTML = `
            <div class="product-card position-relative">
              <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                <h3 class="card-title text-uppercase">
                  Pedido #${order.id}
                </h3>
                <span class="item-price text-primary">$${order.totalPrice}</span>
              </div>
              <p>Fecha: ${order.date}</p>
              <div class="d-flex justify-content-center">
                <a href="#" class="btn btn-medium btn-black view-details" data-order-id="${order.id}">Ver detalles</a>
              </div>
            </div>
          `;
                    ordersCardsContainer.appendChild(orderCard);
                });

                const detailButtons = document.querySelectorAll('.view-details');
                detailButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        const orderId = button.getAttribute('data-order-id');
                        const order = orders.find(o => o.id == orderId);
                        if (order) {
                            const orderDetailsContent = document.getElementById('orderDetailsContent');
                            let productsDetails = '';
                            order.products.forEach(product => {
                                productsDetails += `
                  <div class="row mb-2">
                    <div class="col-4"><strong>Producto:</strong> ${product.name}</div>
                    <div class="col-4"><strong>Precio:</strong> $${product.price}</div>
                    <div class="col-4"><strong>Cantidad:</strong> ${product.quantity}</div>
                  </div>
                `;
                            });
                            orderDetailsContent.innerHTML = `
                <p><strong>ID del Pedido:</strong> ${order.id}</p>
                <p><strong>Fecha:</strong> ${new Date(order.date).toLocaleString()}</p>
                <p><strong>Total:</strong> $${order.totalPrice}</p>
                <div>
                  <h5>Productos</h5>
                  ${productsDetails}
                </div>
              `;
                            const orderDetailsModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
                            orderDetailsModal.show();
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Hubo un problema al obtener los pedidos. Inténtalo de nuevo.';
            errorMessage.style.textAlign = 'center';
            ordersCardsContainer.appendChild(errorMessage);
        });
});
