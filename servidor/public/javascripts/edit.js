// leo todos los query params de la url
const urlParams = new URLSearchParams(window.location.search);
// leo el parametro que le estoy pasando
const usuarioAEditar = urlParams.get('id');

console.log(usuarioAEditar)
//le pego a mi api de usuarios y concateno la variable que tiene el id    
$.ajax('http://localhost:3000/api/users/' + usuarioAEditar) /// traer todos los valores de input
    .done(function (data) {
        console.log(data)
        $('#name').val(data.name);
        $('#surname').val(data.surname);
        $('#phone').val(data.phone),
        $('#email').val(data.email)

    })
$('#put').on('click', function () {
    const nombre = $('#name').val();
    const surname = $('#surname').val();
    const phone = $('#phone').val();
    const email = $('#email').val();

       /// aqui debo hacer la validacion de los input,para mostrar en el usuario antes de enviar al servidor que esto esta mal
  if(nombre.length==0 || nombre.length >= 30 || /^\s+$/.test(nombre) ){
      $ ("#redName").html("El nombre debe poseer menos de 30 caracteres")
    
    return;/// es para indicar que la funcion cierra aqui
  }else if (surname.length == 0 || surname.length >= 30 || /^\s+$/.test(surname) ) {
    $ ("#redSurname").html("El apellido debe poseer menos de 30 caracteres")
    console.log(surname)
    return false;
} else if(!(/^\d{10}$/.test(phone) )) {
    console.log(phone)
    $ ("#redPhone").html("El telefono introducido es incorrecto")
    return false;
} else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    console.log(email)
    $ ("#redMail").html("El email introducido no es valido")
    return false;
} else{
    $.ajax('http://localhost:3000/api/users/' + usuarioAEditar, {
        method: "PUT",
        data: {
            name: $('#name').val(),
            surname: $('#surname').val(),
            phone: $('#phone').val(),
            email:$("#email").val()
        },

        /// edita correctamente pero no se ve el swual ni me lleva  a la pagina index
        success: function () {
            Swal("Genial", 'El usuario fue Editado',"success");
            setTimeout (function(){
              location.href = '../html/index.html';
            },2000)
           
          }
       
      

    })
     }
    console.log("funciona el editado")
})

///