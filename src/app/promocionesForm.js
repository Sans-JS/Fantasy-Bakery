// Importaciones de funciones relacionadas con Firebase y de showMessage.js
import { generar_Promocion } from "./firebase.js";
import { showMessage } from "./showMessage.js";

// Selecciona el formulario y el campo de precio de la promoción
const promocionesForm = document.querySelector('#promociones-form');
const promocionesPriceInput = promocionesForm.querySelector('#promociones-price');

// Agrega un evento de escucha para formatear automáticamente el campo de precio
promocionesPriceInput.addEventListener('input', formatCurrencyInput);

// Función para formatear el campo de precio en formato de moneda
function formatCurrencyInput() {
    const price = parseFloat(promocionesPriceInput.value.replace(/[^0-9.]+/g, ''));
    if (!isNaN(price)) {
        promocionesPriceInput.value = formatCurrency(price);
    }
}

// Función para formatear el precio en formato de moneda
function formatCurrency(amount) {
    return '$' + new Intl.NumberFormat('en-US').format(amount);
}

// Agrega un evento de escucha para el envío del formulario
promocionesForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtiene los valores del formulario
    const title = promocionesForm['promociones-title'].value;
    const content = promocionesForm['promociones-content'].value;
    const price = parseFloat(promocionesPriceInput.value.replace(/[^0-9.]+/g, ''));

    try {
        // Valida los campos del formulario
        if (title === '') {
            throw new Error("El título no puede estar vacío, completa el campo por favor");
        } else if (content === '') {
            throw new Error("La descripción no puede estar vacía, completa el campo por favor");
        } else if (isNaN(price) || price <= 0) {
            throw new Error("El precio no puede estar vacío o no es válido, completa el campo por favor");
        }

        // Llama a la función de generación de promoción en Firebase con el precio formateado
        await generar_Promocion(title, content, price);

        showMessage("Promoción agregada correctamente"); // Muestra un mensaje de éxito
        promocionesForm.reset(); // Restablece el formulario
    } catch (error) {
        showMessage(error.message, "error"); // Muestra un mensaje de error si ocurre algún problema
    }
});
