// Importamos la función signInWithEmailAndPassword de Firebase para el inicio de sesión por correo electrónico y contraseña
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// Importamos la función showMessage desde el archivo showMessage.js para mostrar mensajes en la interfaz de usuario
import { showMessage } from "./showMessage.js";
// Importamos el objeto 'auth' desde firebase.js que contiene la instancia de autenticación de Firebase
import { auth } from './firebase.js';

// Seleccionamos el formulario de inicio de sesión en el DOM
const signInForm = document.querySelector('#signin-form');

// Agregamos un evento de escucha para el envío del formulario de inicio de sesión
signInForm.addEventListener('submit', async e => {
    e.preventDefault(); // Evitamos que el formulario se envíe de forma tradicional

    // Obtenemos el valor del correo electrónico y la contraseña ingresados por el usuario
    const email = signInForm['signin-email'].value;
    const password = signInForm['signin-password'].value;

    try {
        // Intentamos iniciar sesión con el correo electrónico y la contraseña proporcionados
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        
        // Si el inicio de sesión es exitoso, redirigimos al usuario a la página de administrador
        window.location.href = "vista_administrador.html";
        
        // Mostramos un mensaje de bienvenida en la interfaz de usuario
        showMessage('Welcome');
    } catch (error) {
        // Si se produce un error durante el inicio de sesión, manejamos diferentes casos de error
        if (error.code === "auth/wrong-password") {
            showMessage('Correo o contraseña incorrecta, revisa de nuevo', 'error');
        } else if (error.code == "auth/user-not-found") {
            showMessage('El usuario no existe :(', 'error');
        } else {
            showMessage('Algo salió mal, intenta de nuevo :(', 'error');
        }
    }
});
