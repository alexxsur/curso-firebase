window.onload = function() {
    this.verAutenticacion();

    firebase.firestore().collection("TipoLibro").where("bhabilitado", "==", "1")
        .onSnapshot(res => {
            listarTipoLibros(res);
        });
}

function listarTipoLibros(res) {
    var contenido = "<table class='table mt-2'";
    contenido += "<thead>";

    contenido += "<tr>";

    contenido += "<th>Id</th>";
    contenido += "<th>Nombre Tipo Libro</th>";
    contenido += "<th>Descripción</th>";
    contenido += "<th>Operaciones</th>";

    contenido += "</tr>";

    contenido += "</thead>";

    contenido += "<tbody>";


    res.forEach(rpta => {

        var fila = rpta.data();
        contenido += "<tr>";

        contenido += "<td>" + fila.id + "</td>";
        contenido += "<td>" + fila.nombre + "</td>";
        contenido += "<td>" + fila.descripcion + "</td>";
        contenido += "<td></td>";

        contenido += "</tr>";

    });

    contenido += "</tbody>";

    contenido += "</table>";
    document.getElementById("divTipoLibro").innerHTML = contenido;
}