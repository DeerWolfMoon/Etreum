window.onload=function(){
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal=document.getElementById("principal");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnIngresar = document.getElementById("btnIngresar");
    txtCorreoI = document.getElementById("correo");
    txtContrasenaI = document.getElementById("contrasena");
    nombreP = document.getElementById("nombreP");
    menPara = document.getElementById("correoM");
    menMensaje = document.getElementById("mensajeM");
    btnEnviarM = document.getElementById("btnEnviarM");
    photo = document.getElementById("photo");
    camera = document.getElementById("camera");
    abrir = document.getElementById("open");
    redactar = document.getElementById("redactar");
    Mensajes = document.getElementById("mensajes");
    Camara = document.getElementById("camara");


}



btnRegistrar.addEventListener("click", function(){
    ingreso.style.display="none";
    registro.style.display="block";
});


btnRegistro.addEventListener("click",function(){
    if(txtCorreo.value==""){
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    } else {
        txtCorreo.classList.remove("errorCampo");
    }

    if(txtNombre.value==""){
        alert("debe ingresar nombre");
        txtNombre.classList.add("errorCampo");
        return false;
    } else {
        txtNombre.classList.remove("errorCampo");
    }

    if(txtContrasena.value==""){
        alert("Debes escribir la contraseña");
        txtContrasena.classList.add("errorCampo");
        return false;
    } else {
        txtContrasena.classList.remove("errorCampo");
    }

    if(txtConfirmacion.value==""){
        alert("Debes ingresar la confirmacion");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    } else {
        txtConfirmacion.classList.remove("errorCampo");
    }

    if(txtConfirmacion.value!==txtContrasena.value){
        alert("La contraseña y su confirmación no coinciden");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    } else {
        txtConfirmacion.classList.remove("errorCampo");
    }

    if(txtFecha.value==""){
        alert("Debes ingresar la fecha");
        txtFecha.classList.add("errorCampo");
        return false;
    } else {
        txtFecha.classList.remove("errorCampo");
    }

    let datos= new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://tpaadla.orgfree.com/registro.php", {
        method:'POST', //*GET, POST, PUT, DELETLE, etc.
        body:datos
    })

    .then(function(response){
        if(response.ok){
            alert("Usuario registrado");
        }
        else {
            alert("Ocurrio un error al registrar");
            console.log(response);
        }
    })

    .catch(function(err){
        alert("Ocurrio un error inseperado");
        console.log(err);
    })
});

btnIngresar.addEventListener("click", function(){
    if (txtCorreoI.value == ""){
        alert("escriba el correo");
        return false;
    }
    else {
        txtCorreoI.classList.remove("errorCampo");
    }
    if (txtContrasenaI.value == ""){
        alert("escriba la contraseña");
        return false;
    }
    else {
        txtContrasenaI.classList.remove("errorCampo");
    }

    let datosI = new FormData();
    datosI.append("correo", txtCorreoI.value);
    datosI.append("contrasena", txtContrasenaI.value);

    fetch( "http://tpaadla.orgfree.com/Ingreso.php",{
    method: 'POST',
    body: datosI
})
.then(function(response){
    return response.json();
})
.then(function(data){
    if (data.fallo == "contrasena"){
        alert("escriba la contraseña correcta");
    }
    else{
        nombre = data.nombre;
        correo = data.correo; 

        ingreso.style.display = "none";
        principal.style.display = "block";
        nombreP.innerHTML = nombre;
        localStorage.setItem("login", 1);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("correo", correo);
        leerM();
    }
})
.catch(function(err){
    alert("error inesperado");
    console.log(err);
});
});

btnEnviarM.addEventListener("click", function(){
    if (menPara.value == ""){
        alert("escriba el correo a quien va dirigido el mensaje");
        return false;
    }
    else {
        menPara.classList.remove("errorCampo");
    }
    if (menMensaje.value == ""){
        alert("escriba el mensaje que desea enviar");
        return false;
    }
    else {
        menMensaje.classList.remove("errorCampo");
    }

    let datos= new FormData();
    datos.append("correoM", menPara.value);
    datos.append("mensajeM", menMensaje.value);
 

    fetch("http://tpaadla.orgfree.com/registrarMensaje.php", {
        method:'POST', //*GET, POST, PUT, DELETLE, etc.
        body:datos
    })
    .then(function(response){
        if(response.ok){
            alert("Mensaje enviado");
        }
        else {
            alert("Ocurrio un error al enviar el mensaje");
            console.log(response);
        }
    })
  
    .catch(function(err){
        alert("Ocurrio un error inseperado");
        console.log(err);
    })
});

function abrirBarra(){
    document.getElementById("barraMenu").style.width ="250px";

}

function cerrarBarra(){
    document.getElementById("barraMenu").style.width ="0";

}

function leerM(){
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
    fetch( "http://tpaadla.orgfree.com/leerMensajes.php",{
    method: 'POST',
    body: datosLM
})
.then(function(response){
    return response.json();
})
.then(function(data){
    for (let x = 0; x < data.length; x++){
       document.getElementById("mensajes").innerHTML =  
       document.getElementById("mensajes").innerHTML + data[x].mensajes + "<br>"+
       data[x].fecha+"<br>";
    }

});
}

function tomarFoto(){
redactar.style.display = "none";
document.getElementById("mensajes").style.display="none";
document.getElementById("camara").style.display="block";
cerrarBarra()
}

abrir.addEventListener("click", function(){
    camera.click();
});

camera.addEventListener("click", function(){
    phto.src = URL.createObjectURL(e.target.files[0]);
    let link = document.createElement('a');
    link.download = "test.png";
    link.href = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
});
 
document.getElementById("camera").addEventListener("change",function(e){
    ruta=URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src=ruta;
    if(obtenerSO()=="iOS"){
        let link=document.createElement('a');
        link.download="test.png";
        link.href=ruta;
        link.click();
        alert("Foto Capturada");
    }

});

function cerrarSesion() {
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    redactar.style.display="none";
    document.getElementById("principal").style.display="none";
    document.getElementById("mensajes").style.display="none";
    document.getElementById("camara").style.display="none";
    document.getElementById("ingreso").style.display="block";
}

function mensajes() {
    redactar.style.display="block";
    document.getElementById("mensajes").style.display="block";
    document.getElementById("camara").style.display="none";
    cerrarBarra();
}

function obtenerSO(){
    let so=null;
    let platform = window.navigator.platform,
        iosPlatforms= ['iPhone', 'iPad', 'iPod'];
    
    if(iosPlatforms.includes(platform)){
        so='iOS';
    }
    return so;
}


function obtenerLugar(){
    coordenadas={lat: 0, lon: 0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas={lat: position.coords.latitude, lon: position.coords.longitude}
        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
    .then(response => response.json())
    .then(data =>{
        document.getElementById("lugar").value = data.address.country + "," + data.address.state;
    })
    .catch(error=>{
        console.log(error);
        coordenadas={lat: 0,lon: 0};
    })
 
    });
}

document.getElementById("mapa").addEventListener("click", function(){
    if(coordenadas.lat!=0 && coordenadas.lon!=0){
        alert( coordenadas.lat + "," + coordenadas.lon);
        window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon" + coordenadas.lon + "&zoom=20");   
    } else {
        alert("Sin imagen, coordenadas inexistentes");
    }
    if ('serviceWorker'in navigator){
        window.addEventListener('load',()=>{
            navigator.serviceWorker.register('../sw.js').then(()=>{
              console.log('Service Worker Registered')
          });
      });
    }
        
});
