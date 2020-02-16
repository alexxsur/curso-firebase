window.onload = function() {
    this.verAutenticacion();
    firebase.auth().onAuthStateChanged(res => {
        cargarPerfil();
    });
}

var user;

function cargarPerfil() {
    user = firebase.auth().currentUser.uid;
    firebase.firestore().collection("Usuarios").doc(user)
        .get().then(resultado => {
            var res = resultado.data();
            document.getElementById("txtDisplayName").value = res.displayName;
            document.getElementById("txtNombre").value = res.nombre;
            document.getElementById("txtApellido").value = res.apellido;
            document.getElementById("txtEmail").value = res.email;
            document.getElementById("txtTelefono").value = res.phoneNumber;
            document.getElementById("txtDescripcion").value = res.descripcion != undefined ? res.descripcion : "";
            document.getElementById("imgFoto").src = res.photoURL;
        }).catch(err => {
            alert(err);
        });
}

function editarPerfil() {
    var displayName = document.getElementById("txtDisplayName").value;
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var email = document.getElementById("txtEmail").value;
    var phoneNumber = document.getElementById("txtTelefono").value;
    var descripcion = document.getElementById("txtDescripcion").value;

    var photoURL = document.getElementById("imgFoto").src;
    firebase.firestore().collection("Usuarios").doc(user).update({
        displayName: displayName,
        nombre: nombre,
        apellido: apellido,
        email: email,
        phoneNumber: phoneNumber,
        descripcion: descripcion,
    }).then(res => {
        var objFoto = document.getElementById("foto");
        var foto = objFoto.value; // La ruta del archivo seleccionado

        if (foto != null && foto != "") {

            var ref = firebase.storage().ref("fotoPerfil/" + user + "/" + objFoto.files[0].name);
            var archivo = objFoto.files[0];
            var refFoto = ref.put(archivo);
            refFoto.on("state_changed", () => {}, (err) => { alert(err) }, () => {
                refFoto.snapshot.ref.getDownloadURL().then(url => {
                    firebase.firestore().collection("Usuarios").doc(user).update({
                        photoURL: url
                    }).then(respuesta => {
                        alert("Se actualizó correctamente");
                    }).catch(err => {
                        alert(err);
                    })
                })
            })

        } else {
            alert("Se editó correctamente");
        }

    }).catch(err => {
        alert(err);
    })
}

function cambiarFoto(archivo) {
    var file = archivo.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        document.getElementById("imgFoto").src = reader.result;
    }
    reader.readAsDataURL(file);
}