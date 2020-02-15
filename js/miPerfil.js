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

function cambiarFoto(archivo) {
    var file = archivo.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        // Dentro de aca
        document.getElementById("imgFoto").src = reader.result;
    }
    reader.readAsDataURL(file);
}