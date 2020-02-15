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
    var displayName = document.getElementById("txtdisplayName").value;
    var email = document.getElementById("txtcorreo").value;
    var password = document.getElementById("txtcontra").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            return res.user.updateProfile({
                displayName: displayName
            }).then(profile => {
                alert("Se registró correctamente");
                document.getElementById("btnCancelar").click();
                firebase.auth().signOut();

                var user = res.user;

                return firebase.firestore().collection("Usuarios").doc(user.uid)
                    .get().then(el => {
                        var inf = el.data();
                        // Es su primera vez
                        if (inf == null || inf == undefined) {
                            // Insercion
                            return firebase.firestore().collection("Usuarios").doc(user.uid).set({
                                nombre: "",
                                apellido: "",
                                email: user.email,
                                displayName: "",
                                photoURL: user.photoURL,
                                provider: res.additionalUserInfo.providerId,
                                phoneNumber: user.phoneNumber == null ? "" : user.phoneNumber,
                                descripcion: ""
                            }).then(respuesta => {
                                document.location.href = "index.html";
                            }).catch(err => {
                                alert("Ocurrió un error al registrar en base de datos");
                            })
                        } else { // Ya existe
                            document.location.href = "misPrestamos.html"
                        }
                    })
            }).catch(err => {
                alert(err);
            })

        }).catch(err => {
            alert("Ocurrio un error");
        })
}

function authGoogle() {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerGoogle).then(res => {

        var user = res.user;

        return firebase.firestore().collection("Usuarios").doc(user.uid)
            .get().then(el => {
                var inf = el.data();
                // Es su primera vez
                if (inf == null || inf == undefined) {
                    // Insercion
                    return firebase.firestore().collection("Usuarios").doc(user.uid).set({
                        nombre: res.additionalUserInfo.profile.given_name,
                        apellido: res.additionalUserInfo.profile.family_name,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        provider: res.additionalUserInfo.providerId,
                        phoneNumber: user.phoneNumber == null ? "" : user.phoneNumber,
                        descripcion: ""
                    }).then(respuesta => {
                        document.location.href = "misPrestamos.html";
                    }).catch(err => {
                        alert("Ocurrió un error al registrar en base de datos");
                    })
                } else { // Ya existe
                    document.location.href = "misPrestamos.html"
                }
            })

    }).catch(err => {
        alert(err);
    });
}

function authGithub() {
    const providerGithub = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(providerGithub).then(res => {
        var user = res.user;

        return firebase.firestore().collection("Usuarios").doc(user.uid)
            .get().then(el => {
                var inf = el.data();
                // Es su primera vez
                if (inf == null || inf == undefined) {
                    // Insercion
                    return firebase.firestore().collection("Usuarios").doc(user.uid).set({
                        nombre: "",
                        apellido: "",
                        email: user.email,
                        displayName: res.additionalUserInfo.username,
                        photoURL: user.photoURL,
                        provider: res.additionalUserInfo.providerId,
                        phoneNumber: user.phoneNumber == null ? "" : user.phoneNumber,
                        descripcion: ""
                    }).then(respuesta => {
                        document.location.href = "misPrestamos.html";
                    }).catch(err => {
                        alert("Ocurrió un error al registrar en base de datos");
                    })
                } else { // Ya existe
                    document.location.href = "misPrestamos.html"
                }
            })
    }).catch(err => {
        alert(err);
    });
}

function authFacebook() {
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(providerFacebook).then(res => {
        var user = res.user;

        return firebase.firestore().collection("Usuarios").doc(user.uid)
            .get().then(el => {
                var inf = el.data();
                // Es su primera vez
                if (inf == null || inf == undefined) {
                    // Insercion
                    return firebase.firestore().collection("Usuarios").doc(user.uid).set({
                        nombre: "",
                        apellido: "",
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        provider: res.additionalUserInfo.providerId,
                        phoneNumber: user.phoneNumber == null ? "" : user.phoneNumber,
                        descripcion: ""
                    }).then(respuesta => {
                        document.location.href = "misPrestamos.html";
                    }).catch(err => {
                        alert("Ocurrió un error al registrar en base de datos");
                    })
                } else { // Ya existe
                    document.location.href = "misPrestamos.html"
                }
            })

    }).catch(err => {
        alert(err);
    });
}