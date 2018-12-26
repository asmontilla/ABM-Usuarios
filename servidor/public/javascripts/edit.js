///hacer ncadael ajax y apendear el formulario y pedirle que en ca da value nw input 
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

  
//
$('#put').on('click', function () {
    const nombre = $('#name').val();
    const surname = $('#surname').val();
    const phone = $('#phone').val();
    const email = $('#email').val();

       /// aqui debo hacer la validacion de los input,para mostrar en el usuario antes de enviar al servidor que esto esta mal
  if(nombre.length==0 || nombre.length >= 30 || /^\s+$/.test(nombre) ){
    alert("alert EL NOMBRE ")
    return;/// es para indicar que la funcion cierra aqui
  }else if (surname.length == 0 || surname.length >= 30 || /^\s+$/.test(surname) ) {
    console.log(surname)
    alert ('el apellido ingresado no es valido')
    return false;
} else if(!(/^\d{10}$/.test(phone) )) {
    console.log(phone)

    // cajita con letras rojas como el tp
    alert ('el numero ingresado no es valido')
    return false;
} else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    console.log(email)
    alert ('el mail ingresado no es valido')
    return false;
} else{
  //aqui el modal
    alert('paso las validaciones y puedo editar')
}
    $.ajax('http://localhost:3000/api/users/' + usuarioAEditar, {
        method: "PUT",
        data: {
            name: $('#name').val(),
            surname: $('#surname').val(),
            phone: $('#phone').val(),
            email:$("#email").val()
        },
       
        success: function () {
            alert( "El usuario fue editado")
        }

    })
    console.log("funciona")
})

///