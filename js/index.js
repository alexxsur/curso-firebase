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