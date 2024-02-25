// Importamos la función createUserWithEmailAndPassword de Firebase para crear un usuario con correo electrónico y contraseña
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// Importamos el objeto 'auth' desde firebase.js que contiene la instancia de autenticación de Firebase
import { auth } from './firebase.js';
// Importamos la función showMessage desde el archivo showMessage.js para mostrar mensajes en la interfaz de usuario
import { showMessage } from "./showMessage.js";

// Seleccionamos el formulario de registro en el DOM
const signupForm = document.querySelector('#signup-form');

// Agregamos un evento de escucha para el envío del formulario de registro
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos que el formulario se envíe de forma tradicional

    // Obtenemos el valor del correo electrónico y la contraseña ingresados por el usuario
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Validación del correo electrónico
    if (!isValidEmail(email)) {
        showMessage("Correo inválido, revisa bien la información", "error");
        return;
    }

    // Validación de la contraseña
    if (!isValidPassword(password)) {
        showMessage('La contraseña es muy corta, debe tener al menos 6 caracteres', "error");
        return;
    }

    try {
        // Intentamos crear un usuario con el correo electrónico y la contraseña proporcionados
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        
        // Si la creación del usuario es exitosa, ocultamos el modal de registro
        const signUpModal = document.querySelector('#SignUpModal');
        const modal = bootstrap.Modal.getInstance(signUpModal);
        modal.hide();
        
        // Mostramos un mensaje de bienvenida en la interfaz de usuario
        showMessage("Bienvenido " + userCredentials.user.email);
    } catch (error) {
        // Si se produce un error durante la creación del usuario, manejamos diferentes casos de error
        if (error.code === 'auth/email-already-in-use') {
            showMessage('El correo ya está en uso', "error");
        } else {
            showMessage('Algo salió mal :(', "error");
        }
    }
});

// Función para validar el formato del correo electrónico utilizando una expresión regular
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// Función para validar la longitud de la contraseña
function isValidPassword(password) {
    return password.length >= 6;
}
