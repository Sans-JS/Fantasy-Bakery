// Esta función muestra un mensaje en la interfaz de usuario utilizando la librería Toastify
export function showMessage(message, type = "success") {
    Toastify({
        text: message, // El mensaje que se mostrará
        duration: 2000, // Duración en milisegundos durante la cual se mostrará el mensaje
        newWindow: true, // Indica si el mensaje se mostrará en una nueva ventana
        close: true, // Indica si se puede cerrar el mensaje
        gravity: "bottom", // La posición vertical del mensaje ("top" o "bottom")
        position: "right", // La posición horizontal del mensaje ("left", "center" o "right")
        stopOnFocus: true, // Indica si el mensaje se mantendrá visible cuando se haga foco en él
        style: {
            // Establece el estilo del mensaje en función del tipo proporcionado ("success" o "error")
            background: type === "success" ? "green" : "red"
        },
        onClick: function () { } // Callback que se ejecutará cuando se haga clic en el mensaje
    }).showToast(); // Método para mostrar el mensaje en la interfaz de usuario
}
