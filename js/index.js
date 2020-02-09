window.onload = function() {
    this.verAutenticacion();
}

function iniciarSesion() {
    var email = document.getElementById("txtcorreoIngresar").value;
    var password = document.getElementById("txtcontraIngresar").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {

            document.location.href = "misPrestamos.html";
            // IMAGEN
            if (res.user.photoURL != null) {
                document.getElementById("imgFotoUsuario").src = res.user.photoURL;
            } else {
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

function authGoogle() {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerGoogle).then(res => {
        document.location.href = "misPrestamos.html";
    }).catch(err => {
        alert(err);
    });
}

function authGithub() {
    const providerGithub = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(providerGithub).then(res => {
        document.location.href = "misPrestamos.html";
    }).catch(err => {
        alert(err);
    });
}