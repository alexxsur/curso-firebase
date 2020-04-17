  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyBA56aEa3EOLBklcq_Yu4bIT4FQ8yfxJOQ",
      authDomain: "miprimerproyectoconfireb-25554.firebaseapp.com",
      databaseURL: "https://miprimerproyectoconfireb-25554.firebaseio.com",
      projectId: "miprimerproyectoconfireb-25554",
      storageBucket: "miprimerproyectoconfireb-25554.appspot.com",
      messagingSenderId: "463869648612",
      appId: "1:463869648612:web:c148e6e59ab5e61f7056f1",
      measurementId: "G-6F79PTW7TJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function salir() {
      firebase.auth().signOut()
          .then(res => {
              document.location.href = "index.html"
          }).catch(err => {
              alert(err);
          })
  }

  function verAutenticacion() {
      firebase.auth().onAuthStateChanged(res => {
          if (res == null) {
              document.getElementById("itemSalir").style.display = "none";
              document.getElementById("itemTipoLibro").style.display = "none";
              document.getElementById("itemLibro").style.display = "none";
              document.getElementById("itemPrestamos").style.display = "none";
              document.getElementById("itemMisPrestamos").style.display = "none";
              document.getElementById("itemMiPerfil").style.display = "none";
              document.getElementById("itemRegistro").style.display = "inline-block";
              if (document.getElementById("divRedes")) {
                  document.getElementById("divRedes").style.visibility = "visible";
              }
              document.getElementById("divDatosUsu").style.visibility = "hidden";
          } else {
              document.getElementById("itemSalir").style.display = "inline-block";
              document.getElementById("itemTipoLibro").style.display = "inline-block";
              document.getElementById("itemLibro").style.display = "inline-block";
              document.getElementById("itemPrestamos").style.display = "inline-block";
              document.getElementById("itemMisPrestamos").style.display = "inline-block";
              document.getElementById("itemMiPerfil").style.display = "inline-block";
              document.getElementById("itemRegistro").style.display = "none";

              if (document.getElementById("divRedes")) {
                  document.getElementById("divRedes").style.visibility = "hidden";
              }
              document.getElementById("divDatosUsu").style.visibility = "visible";

              /* if (res.displayName != null) {
                  document.getElementById("lblNombreUsuario").innerHTML = "Bienvenido " + res.displayName;
              } else if (res.email != null) {
                  document.getElementById("lblNombreUsuario").innerHTML = "Bienvenido " + res.email;
              } */

              firebase.firestore().collection("Usuarios").doc(res.uid)
                  .get().then(resultado => {
                      var res = resultado.data();
                      if (res != undefined && res.displayName != null) {
                          document.getElementById("lblNombreUsuario").innerHTML = "Bienvenido " + res.displayName;
                      } else {
                          document.getElementById("lblNombreUsuario").innerHTML = "Bienvenido " + res.email;
                      }

                      if (res.photoURL != null) {
                          document.getElementById("imgFotoUsuario").src = res.photoURL;
                      } else {
                          document.getElementById("imgFotoUsuario").src = "img/noFoto.jpg";
                      }

                  });

          }
      })
  }

  function LimpiarDatos() {
      // class Limpiar

      var controles = document.getElementsByClassName("limpiar");
      var ncontroles = controles.length;
      for (var i = 0; i < ncontroles; i++) {
          controles[i].value = "";
      }
  }