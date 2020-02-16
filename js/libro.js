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