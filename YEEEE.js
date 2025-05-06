let currentSlide =0;

function moveSlide(direction) {
const slides = document.querySelectorAll('.carousel-images img');
const totalSlides = slides.length;

// Actualiza el índice de la imagen actual
currentSlide += direction;

// Si el índice es menor que 0, vuelve al último slide
if (currentSlide <0) {
currentSlide = totalSlides - 1;
}
// Si el índice es mayor o igual al total de slides, vuelve al primer slide
if (currentSlide >= totalSlides) {
currentSlide = 0;
}

// Desplazar las imágenes en el carrusel
document.querySelector('.carousel-images').style.transform = `translateX(-${currentSlide * 5}%)`;
}

// Mover automáticamente cada 3 segundos
setInterval(() => {
moveSlide(1); // 1 para avanzar
}, 500);


document.addEventListener('DOMContentLoaded', () => {
    const btnCarrito = document.querySelector('.container-icon');
    const contenedorCarritoProductos = document.querySelector('.container-cart-products');
    const listaProductos = document.querySelector('.container-items');
    const filaProducto = document.querySelector('.row-product');
    const valorTotal = document.querySelector('.total-pagar');
    const contarProductos = document.querySelector('#contador-productos');
    const carritoVacio = document.querySelector('.cart-empty');
    const carritoTotal = document.querySelector('.cart-total');
    
    let todosLosProductos = [];
    
    btnCarrito.addEventListener('click', () => {
        contenedorCarritoProductos.classList.toggle('hidden-cart');
    });
    
    listaProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-cart')) {
            const producto = e.target.parentElement;
    
            const infoProducto = {
                cantidad: 1,
                titulo: producto.querySelector('h2').textContent,
                precio: parseInt(producto.querySelector('.price').textContent.slice(1))
            };
    
            const existe = todosLosProductos.find(prod => prod.titulo === infoProducto.titulo);
    
            if (existe) {
                existe.cantidad++;
            } else {
                todosLosProductos.push(infoProducto);
            }
    
            actualizarCarrito();
        }
    });
    
    filaProducto.addEventListener('click', (e) => {
        if (e.target.classList.contains('icon-close')) {
            const producto = e.target.parentElement;
            const titulo = producto.querySelector('.titulo-producto-carrito').textContent;
    
            todosLosProductos = todosLosProductos.filter(prod => prod.titulo !== titulo);
            actualizarCarrito();
        }
    });
    
    function actualizarCarrito() {
        if (todosLosProductos.length === 0) {
            carritoVacio.classList.remove('hidden');
            filaProducto.classList.add('hidden');
            carritoTotal.classList.add('hidden');
        } else {
            carritoVacio.classList.add('hidden');
            filaProducto.classList.remove('hidden');
            carritoTotal.classList.remove('hidden');
        }
    
        filaProducto.innerHTML = "";
        let total = 0;
        let totalProductos = 0;
    
        todosLosProductos.forEach(producto => {
            const contenedorProducto = document.createElement('div');
            contenedorProducto.classList.add('cart-product');
    
            contenedorProducto.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${producto.cantidad}</span>
                    <p class="titulo-producto-carrito">${producto.titulo}</p>
                    <span class="precio-producto-carrito">$${producto.precio * producto.cantidad}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
    
            filaProducto.appendChild(contenedorProducto);
            total += producto.precio * producto.cantidad;
            totalProductos += producto.cantidad;
        });
    
        valorTotal.textContent = {total};
        contarProductos.textContent = totalProductos;
    }
});
const cart = [];

    function addToCart(name, price) {
      cart.push({ name, price });
      updateCart();
      document.getElementById('cart').classList.add('active');
    }

    function updateCart() {
      const cartItems = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
      });
      cartTotal.textContent = total;
    }

    function toggleCart() {
      const cartModal = document.getElementById('cart');
      cartModal.classList.toggle('active');
    }

    function checkout() {
      if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
      }
      alert('Compra realizada con éxito');
      cart.length = 0;
      updateCart();
      toggleCart();

       


    }




    

    