window.onload = function() {
    this.verAutenticacion();
    // Solo aquellos cuyo bhabilitado es 1
    firebase.firestore().collection("Libro").where("bhabilitado", "==", 1)
        .onSnapshot(res => {
            listarLibros(res);
        });
}

function listarLibros(res) {
    var contenido = "<table class='table mt-2'";
    contenido += "<thead>";

    contenido += "<tr>";

    contenido += "<th>Id</th>";
    contenido += "<th>Imagen</th>";
    contenido += "<th>Nombre Libro</th>";
    contenido += "<th>Fecha Publicación</th>";
    contenido += "<th>Nº Pag</th>";
    contenido += "<th>Operaciones</th>";

    contenido += "</tr>";

    contenido += "</thead>";

    contenido += "<tbody>";


    res.forEach(rpta => {

        var fila = rpta.data();
        contenido += "<tr>";

        contenido += "<td>" + rpta.id + "</td>";
        contenido += "<td> <img width='100' height = '100' src = '" + fila.photoURL + "'/> </td>";
        contenido += "<td>" + fila.nombre + "</td>";
        contenido += "<td>" + fila.fechaPublicacion + "</td>";
        contenido += "<td>" + fila.numeroPaginas + "</td>";
        contenido += "<td>";
        contenido += "<input type='button' value='Editar' onclick='abrirModal(\"" + rpta.id + "\")' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>";
        contenido += " <input type='button' value='Eliminar' onclick='Eliminar(\"" + rpta.id + "\")' class='btn btn-danger'>";
        contenido += "</td>";

        contenido += "</tr>";

    });

    contenido += "</tbody>";

    contenido += "</table>";
    document.getElementById("divLibro").innerHTML = contenido;
}

function subirImage(archivo) {
    var file = archivo.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        document.getElementById("imgFotoLibro").src = reader.result;
    }
    reader.readAsDataURL(file);
}

function subirArchivo(archivo) {
    var file = archivo.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        document.getElementById("iframePreview").src = reader.result;
    }
    reader.readAsDataURL(file);
}

function guardarLibro() {
    var idLibro = document.getElementById("txtIdLibro").value;
    var nombre = document.getElementById("txtNombre").value;
    var numeroPaginas = document.getElementById("txtNumeroPaginas").value;
    var cantidadTotal = document.getElementById("txtCantidadTotal").value;
    var img = document.getElementById("fileImage").files[0];
    var file = document.getElementById("file").files[0];

    if (idLibro == "") {
        firebase.firestore().collection("Libro").add({
            nombre,
            numeroPaginas: numeroPaginas * 1,
            cantidadTotal: cantidadTotal * 1,
            bhabilitado: 1
        }).then(res => {
            var id = res.id;
            if (img != undefined && img != null && file != undefined && file != null) {
                // Imagen
                if (img != undefined && img != null) {
                    var refImg = firebase.storage().ref("libroImg/" + id + "/" + img.name);
                    var subImg = refImg.put(img);
                    subImg.on("state_changed", () => {}, (err) => { alert(err) }, () => {
                        subImg.snapshot.ref.getDownloadURL().then(url => {
                            firebase.firestore().collection("Libro").doc(id).update({
                                photoURL: url
                            }).then(respuesta => {
                                alert("Se registró correctamente");
                            }).catch(err => {
                                alert(err);
                            })
                        })
                    })
                }

                // PDF

                if (file != undefined && file != null) {
                    var refFile = firebase.storage().ref("libroFile/" + id + "/" + file.name);
                    var subFile = refFile.put(file);
                    subFile.on("state_changed", () => {}, (err) => { alert(err) }, () => {
                        subFile.snapshot.ref.getDownloadURL().then(url => {
                            firebase.firestore().collection("Libro").doc(id).update({
                                FileURL: url
                            }).then(respuesta => {
                                alert("Se registró correctamente");
                            }).catch(err => {
                                alert(err);
                            })
                        })
                    })
                }
            } else {
                alert("Se registró correctamente");
            }
        }).catch(err => {
            alert(err);
        })
    } else {

    }
}

function cerrarPoppup() {
    document.getElementById("btnCancelar").click();
}