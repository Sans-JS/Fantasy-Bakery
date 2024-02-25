// Importa las funciones 'signOut' y 'auth' desde las librerías de Firebase Authentication
// Importa la función 'showMessage' desde un archivo local llamado 'showMessage.js'
import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { showMessage } from "./showMessage.js";
import { auth } from "./firebase.js"; // Importa el objeto 'auth' desde un archivo local llamado 'firebase.js'

// Obtiene una referencia al elemento HTML con el id 'logOut'
const logOut = document.querySelector('#logOut');

// Agrega un evento de escucha al elemento 'logOut' que se activa cuando se hace clic en él
logOut.addEventListener('click', async () => {
    // Realiza el cierre de sesión utilizando la función 'signOut' de Firebase Authentication
    await signOut(auth);

    // Muestra un mensaje indicando que la sesión ha sido cerrada utilizando la función 'showMessage'
    showMessage("Sesión cerrada");

    // Inicia un temporizador que redirige al usuario a 'index.html' después de 2 segundos
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
});
