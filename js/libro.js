window.onload = function() {
    this.verAutenticacion();
    console.log('LIBRO');
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
            } else {
                alert("Se registró correctamente");
            }
        }).catch(err => {
            alert(err);
        })
    } else {

    }
}