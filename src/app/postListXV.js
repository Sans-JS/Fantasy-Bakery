// Selecciona el elemento HTML con la clase 'postsXV'
const postListXV = document.querySelector('.postsXV');

// Función que configura la visualización de productos para XV años
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
                <p class="about__paragrah">Precio: $${pasteles.price}</p>
            </article>
            `;
            html += article; // Agrega el fragmento de HTML al acumulador 'html'
        });
        postListXV.innerHTML = html; // Establece el contenido HTML del elemento 'postListXV' con el HTML generado
    } else {
        // Si no hay datos disponibles, muestra un mensaje indicando que el usuario no ha iniciado sesión
        postListXV.innerHTML = '<h1>No haz iniciado sesión</h1>';
    }
}
