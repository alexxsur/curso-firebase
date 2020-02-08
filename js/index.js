window.onload = function() {
    this.verAutenticacion();
    console.log('INDEX');
}

function iniciarSesion() {
    var email = document.getElementById("txtcorreoIngresar").value;
    var password = document.getElementById("txtcontraIngresar").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {

            document.location.href = "misPrestamos.html";
            // IMAGEN
            if (res.user.photoURL != null) {
                console.log("PRUEBA1");
                document.getElementById("imgFotoUsuario").src = res.user.photoURL;
            } else {
                console.log("PRUEBA2");
                document.getElementById("imgFotoUsuario").src = "img/noFoto.jpg";
            }
        }).catch(err => {
            document.getElementById("alertErrorLogueo").style.display = "block";
            document.getElementById("alertErrorLogueo").innerHTML = err;
        })
}

function createUser() {
    var email = document.getElementById("txtcorreo").value;
    var password = document.getElementById("txtcontra").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            alert("Se registró correctamente");
            document.getElementById("btnCancelar").click();
        }).catch(err => {
            alert("Ocurrio un error");
        })
}