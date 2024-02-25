// Selecciona el primer elemento en el documento HTML que tenga la clase "postsGraduacion"
const postListGraduacion = document.querySelector('.postsGraduacion')

// Exporta una función llamada setUpGraduacion que toma un parámetro 'data'
export const setUpGraduacion = (data) => {
    // Comprueba si la longitud de 'data' es mayor que cero
    if (data.length) {
        let html = '' // Inicializa una cadena vacía llamada 'html'
        
        // Itera sobre cada documento en 'data'
        data.forEach(doc => {
            const pasteles = doc.data() // Obtiene los datos del documento actual
            // Crea un fragmento de HTML usando los datos del documento actual
            const article = `
            <article class="about__icons">
                <img src="images/boda/1.jpg" class="about__icon" alt="">
                <h3 class="about__title">${pasteles.title}</h3>
                <p class="about__paragrah">${pasteles.content}</p>
                <p class="about__paragrah">Precio: $${pasteles.price}</p>
            </article>
            `
            html += article // Agrega el fragmento de HTML al acumulador 'html'
        });
        
        // Establece el contenido HTML del elemento seleccionado en el documento 
        // con la clase 'postsGraduacion' como la cadena acumulada 'html'
        postListGraduacion.innerHTML = html
    } else {
        // Si 'data' está vacío, establece el contenido HTML del elemento seleccionado
        // en el documento con la clase 'postsGraduacion' como un mensaje de error
        postListGraduacion.innerHTML = '<h1>No haz iniciado sesión</h1>'
    }
}
