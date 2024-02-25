// Importaciones de funciones relacionadas con Firebase y de showMessage.js
import { eliminar_XV } from "./firebase.js";
import { editar_XV } from './firebase.js';
import { ActualizarXV } from "./firebase.js";
import { showMessage } from "./showMessage.js";

// Selecciona el elemento HTML con la clase 'postsXV' y el formulario de producto
const postListXV = document.querySelector('.postsXV');
const productoForm = document.querySelector('#producto-form');

// Variable para almacenar el ID del producto actual
let id = '';

// Función para formatear el precio en formato de moneda
function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US');
}

// Función que configura la visualización y funcionalidad de los productos para XV años
export const setUpXV = (data) => {
    if (data.length) {
        let html = ''; // Variable para almacenar el HTML generado
        data.forEach(doc => {
            const pasteles = doc.data(); // Obtiene los datos del documento actual
            // Crea un fragmento de HTML utilizando los datos del documento actual
            const article = `
            <article class="about__icons">
                <img src="images/boda/1.jpg" class="about__icon" alt="">
                <h3 class="about__title">${pasteles.title}</h3>
                <p class="about__paragrah">${pasteles.content}</p>
                <p class="about__paragrah">Precio: ${formatCurrency(pasteles.price)}</p>
                <label>
                    <button class="btn btn-danger delete" data-id="${doc.id}">Eliminar</button>
                    <button class="btn btn-success edit" data-id="${doc.id}"
                    data-bs-toggle="modal" data-bs-target="#editar">Actualizar</button>
                </label>
            </article>
            `;
            html += article; // Agrega el fragmento de HTML al acumulador 'html'
        });
        postListXV.innerHTML = html; // Establece el contenido HTML del elemento 'postListXV' con el HTML generado

        // Configura el evento de clic para los botones de eliminar
        const btnDelete = postListXV.querySelectorAll('.delete');
        btnDelete.forEach(btn => {
            btn.addEventListener('click', async ({ target: { dataset } }) => {
                try {
                    await eliminar_XV(dataset.id); // Llama a la función para eliminar el producto
                    showMessage("Producto eliminado correctamente, recargue para visualizar los cambios");
                } catch (error) {
                    showMessage(error.message, "error"); // Muestra un mensaje de error si ocurre algún problema
                }
            });
        });

        // Configura el evento de clic para los botones de editar
        const btnEdit = postListXV.querySelectorAll('.edit');
        btnEdit.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await editar_XV(e.target.dataset.id); // Obtiene los datos del producto a editar
                const editar = doc.data(); // Extrae los datos del documento
                // Obtiene los elementos del formulario de producto
                const title = productoForm['producto-title'];
                const content = productoForm['producto-content'];
                const price = productoForm['producto-price'];

                // Establece los valores del formulario con los datos del producto a editar
                title.value = editar.title;
                content.value = editar.content;
                price.value = formatCurrency(editar.price);
                id = doc.id; // Almacena el ID del producto a editar

                // Configura el evento de envío del formulario de edición
                productoForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    try {
                        validateFields(title.value, content.value, price.value); // Valida los campos del formulario
                        await ActualizarXV(id, { title: title.value, content: content.value, price: parseFloat(price.value.replace(/[^0-9.]+/g, '')) });
                        showMessage("Producto actualizado, recargue para visualizar los cambios"); // Muestra un mensaje de éxito
                        const actualizarModal = document.querySelector('#editar');
                        const modal = bootstrap.Modal.getInstance(actualizarModal);
                        modal.hide(); // Oculta el modal de edición
                    } catch (error) {
                        showMessage(error.message, "error"); // Muestra un mensaje de error si ocurre algún problema
                    }
                });

                // Agrega evento 'input' para formatear automáticamente el precio en el formulario
                price.addEventListener('input', (e) => {
                    e.target.value = formatCurrency(parseFloat(e.target.value.replace(/[^0-9.]+/g, '')));
                });
            });
        });
    } else {
        postListXV.innerHTML = '<h1>No existen productos o no ha iniciado sesión</h1>'; // Muestra un mensaje si no hay productos
    }
};

// Función para validar los campos del formulario de producto
function validateFields(title, content, price) {
    const formattedPrice = parseFloat(price.replace(/[^0-9.]+/g, '')); // Convierte el precio a un número
    if (title.trim() === '') {
        throw new Error('El título no puede estar vacío, completa el campo por favor');
    }
    if (content.trim() === '') {
        throw new Error('La descripción no puede estar vacía, completa el campo por favor');
    }
    if (isNaN(formattedPrice) || formattedPrice <= 0) {
        throw new Error('El precio no es válido, debe ser un número mayor que cero');
    }
}
