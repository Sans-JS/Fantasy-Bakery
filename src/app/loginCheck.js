// Verificamos los hipervinculos con la clase "logged-out" y "logged-in"
const loggedOutLinks = document.querySelectorAll('.logged-out'),
    loggedInLinks = document.querySelectorAll('.logged-in');

// Según el estado del usuario, los hipervinculos se ocultan o se muestran
export const loginCheck = user => {
    if (user) {
        loggedOutLinks.forEach(link=>link.style.display = 'none')
        loggedInLinks.forEach(link=>link.style.display = 'block')
    } else {
        loggedOutLinks.forEach(link=>link.style.display = 'block')
        loggedInLinks.forEach(link=>link.style.display = 'none')
    }
}