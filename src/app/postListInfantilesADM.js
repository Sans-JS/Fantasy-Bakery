// Importa las funciones necesarias desde el archivo 'firebase.js' y 'showMessage.js'
import { eliminar_infantil, editar_infantil, ActualizarInfantiles } from "./firebase.js";
import { showMessage } from "./showMessage.js";

// Selecciona el elemento HTML con la clase 'posts_infantiles' y el formulario con id 'producto-form'
const postList_infantil = document.querySelector('.posts_infantiles');
const productoForm = document.querySelector('#producto-form');
let id = ''; // Variable para almacenar el ID del producto seleccionado

// Función para formatear el precio como una cadena con formato de moneda
function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US');
}

// Función que configura la visualización de las publicaciones de productos infantiles
export const setUpInfantiles = (data) => {
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
        postList_infantil.innerHTML = html; // Establece el contenido HTML del elemento 'postList_infantil' con el HTML generado

        // Agrega un evento de clic a cada botón 'Eliminar'
        const btnDelete = postList_infantil.querySelectorAll('.delete');
        btnDelete.forEach(btn => {
            btn.addEventListener('click', async ({ target: { dataset } }) => {
                try {
                    // Llama a la función 'eliminar_infantil' con el ID del elemento seleccionado
                    await eliminar_infantil(dataset.id);
                    showMessage("Producto eliminado correctamente, recargue para visualizar los cambios");
                } catch (error) {
                    showMessage(error.message, "error");
                }
            });
        });

        // Agrega un evento de clic a cada botón 'Actualizar'
        const btnEdit = postList_infantil.querySelectorAll('.edit');
        btnEdit.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                // Obtiene los datos de la publicación seleccionada para editar
                const doc = await editar_infantil(e.target.dataset.id);
                const editar = doc.data();
                // Obtiene los elementos del formulario
                const title = productoForm['producto-title'];
                const content = productoForm['producto-content'];
                const price = productoForm['producto-price'];

                // Llena los campos del formulario con los datos de la publicación seleccionada
                title.value = editar.title;
                content.value = editar.content;
                price.value = formatCurrency(editar.price);
                id = doc.id; // Guarda el ID del documento seleccionado

                // Agrega un evento de envío al formulario para actualizar la publicación
                productoForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    try {
                        // Valida los campos del formulario
                        validateFields(title.value, content.value, price.value);
                        // Actualiza la publicación utilizando la función 'ActualizarInfantiles'
                        await ActualizarInfantiles(id, { title: title.value, content: content.value, price: parseFloat(price.value.replace(/[^0-9.]+/g, '')) });
                        showMessage("Producto actualizado, recargue para visualizar los cambios");
                        // Oculta el modal de edición después de actualizar la publicación
                        const actualizarModal = document.querySelector('#editar');
                        const modal = bootstrap.Modal.getInstance(actualizarModal);
                        modal.hide();
                    } catch (error) {
                        showMessage(error.message, "error");
                    }
                });

                // Agrega un evento 'input' al campo de precio para formatearlo automáticamente
                price.addEventListener('input', (e) => {
                    e.target.value = formatCurrency(parseFloat(e.target.value.replace(/[^0-9.]+/g, '')));
                });
            });
        });
    } else {
        // Si no hay datos disponibles, muestra un mensaje indicando que no existen productos o el usuario no ha iniciado sesión
        postList_infantil.innerHTML = '<h1>No existen productos o no ha iniciado sesión</h1>';
    }
};

// Función para validar los campos del formulario de edición/creación de publicaciones
function validateFields(title, content, price) {
    const formattedPrice = parseFloat(price.replace(/[^0-9.]+/g, ''));
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
