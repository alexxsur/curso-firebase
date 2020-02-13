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

        contenido += "<td>" + rpta.id + "</td>";
        contenido += "<td>" + fila.nombre + "</td>";
        contenido += "<td>" + fila.descripcion + "</td>";
        contenido += "<td>";
        contenido += "<input type='button' value='Editar' onclick='abrirModal(\"" + rpta.id + "\")' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>";
        contenido += " <input type='button' value='Eliminar' onclick='Eliminar(\"" + rpta.id + "\")' class='btn btn-danger' data-toggle='modal' data-target='#exampleModal'>";
        contenido += "</td>";

        contenido += "</tr>";

    });

    contenido += "</tbody>";

    contenido += "</table>";
    document.getElementById("divTipoLibro").innerHTML = contenido;
}

function abrirModal(id) {
    if (id == 0) {
        document.getElementById("lblTitulo").innerHTML = "Agregando Tipo Libro";
    } else {
        document.getElementById("lblTitulo").innerHTML = "Editando Tipo Libro";
    }
}