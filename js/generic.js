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
          console.log(res);
          if (res == null) {
              console.log(res);
              document.getElementById("itemSalir").style.display = "none";
              document.getElementById("itemTipoLibro").style.display = "none";
              document.getElementById("itemLibro").style.display = "none";
              document.getElementById("itemPrestamos").style.display = "none";
              document.getElementById("itemRegistro").style.display = "inline-block";

              document.getElementById("divDatosUsu").style.visibility = "visible";
              document.getElementById("divRedes").style.visibility = "hidden";
          } else {
              console.log(res);
              document.getElementById("itemSalir").style.display = "inline-block";
              document.getElementById("itemTipoLibro").style.display = "inline-block";
              document.getElementById("itemLibro").style.display = "inline-block";
              document.getElementById("itemPrestamos").style.display = "inline-block";
              document.getElementById("itemRegistro").style.display = "none";

              document.getElementById("divDatosUsu").style.visibility = "hidden";
              document.getElementById("divRedes").style.visibility = "visible";
          }
      })
  }