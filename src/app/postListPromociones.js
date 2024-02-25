// Selecciona el elemento HTML con la clase 'posts_promociones'
const postList_promociones = document.querySelector('.posts_promociones');

// Función que configura la visualización de las promociones de productos
export const setUpPromociones = (data) => {
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
        postList_promociones.innerHTML = html; // Establece el contenido HTML del elemento 'postList_promociones' con el HTML generado
    } else {
        // Si no hay datos disponibles, muestra un mensaje indicando que no hay promociones existentes
        postList_promociones.innerHTML = '<h1>No hay promociones existentes</h1>';
    }
}
