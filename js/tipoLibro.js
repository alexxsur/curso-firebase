window.onload = function() {
    this.verAutenticacion();
    // Solo aquellos cuyo bhabilitado es 1
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
        contenido += " <input type='button' value='Eliminar' onclick='Eliminar(\"" + rpta.id + "\")' class='btn btn-danger'>";
        contenido += "</td>";

        contenido += "</tr>";

    });

    contenido += "</tbody>";

    contenido += "</table>";
    document.getElementById("divTipoLibro").innerHTML = contenido;
}

function abrirModal(id) {
    limpiar();
    if (id == 0) {
        document.getElementById("lblTitulo").innerHTML = "Agregando Tipo Libro";
    } else {
        document.getElementById("lblTitulo").innerHTML = "Editando Tipo Libro";
        firebase.firestore().collection("TipoLibro").doc(id).get().then(res => {
            // Obtuvimos el ID
            document.getElementById("txtIdTipoLibro").value = id;
            // Vamos a base de datos
            document.getElementById("txtNombre").value = res.data().nombre;
            document.getElementById("txtDescripcion").value = res.data().descripcion;
        }).catch(err => {
            alert(err);
        })
    }
}

function Eliminar(id) {
    if (confirm("¿Deseas eliminar realmente?") == 1) {
        firebase.firestore().collection("TipoLibro").doc(id).update({
            bhabilitado: "0"
        }).then(res => {
            alert("Se eliminó correctamente");
        }).catch(err => {
            alert(err);
        })
    }
}

function limpiar() {
    document.getElementById("alertaErrorRegistro").style.display = "none";
    document.getElementById("alertaErrorRegistro").innerHTML = "";

    LimpiarDatos();
    // document.getElementById("txtIdTipoLibro").value = "";
    // document.getElementById("txtNombre").value = "";
    // document.getElementById("txtDescripcion").value = "";
}

function crearTipoLibro() {
    var idTipoLibro = document.getElementById("txtIdTipoLibro").value;
    var nombre = document.getElementById("txtNombre").value;
    var descripcion = document.getElementById("txtDescripcion").value;

    if (nombre == "") {
        document.getElementById("alertaErrorRegistro").style.display = "block";
        document.getElementById("alertaErrorRegistro").innerHTML = "Debe ingresar el nombre";
        return;
    }

    // Es nuevo
    if (idTipoLibro == "") {
        firebase.firestore().collection("TipoLibro").add({
            nombre: nombre,
            descripcion: descripcion,
            bhabilitado: "1"
        }).then(res => {
            alert("Se agregó correctamente");
            document.getElementById("btnCancelar").click();
        }).catch(err => {
            document.getElementById("alertaErrorRegistro").style.display = "block";
            document.getElementById("alertaErrorRegistro").innerHTML = err;
        })

    } else {
        firebase.firestore().collection("TipoLibro").doc(idTipoLibro).update({
            nombre: nombre,
            descripcion: descripcion,
        }).then(res => {
            alert("Se actualizó correctamente");
            document.getElementById("btnCancelar").click();
        }).catch(err => {
            document.getElementById("alertaErrorRegistro").style.display = "block";
            document.getElementById("alertaErrorRegistro").innerHTML = err;
        })
    }
}