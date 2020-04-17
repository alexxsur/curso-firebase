window.onload = function() {
    this.verAutenticacion();
    // Solo aquellos cuyo bhabilitado es 1
    firebase.firestore().collection("Libro").where("disponibles", ">", 0)
        .onSnapshot(res => {
            listarLibrosPrestamos(res);
        });
}

function listarLibrosPrestamos(res) {
    var cadena = `Linea  1
    Linea 2`;
}