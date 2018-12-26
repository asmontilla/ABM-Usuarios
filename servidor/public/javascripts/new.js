$('#new').on('click', function () {
    const nombre = $('#nombre').val();
    const surname = $('#apellido').val();
    const phone = $('#telefono').val();
    const email = $('#email').val();

  
    var newUser = {
      name: nombre,
      surname: surname,
      phone:phone,
      email:email
    }

    /// aqui debo hacer la validacion de los input,para mostrar en el usuario antes de enviar al servidor que esto esta mal
  if(nombre.length==0 || nombre.length >= 30 || /^\s+$/.test(nombre) ){
    alert("alert name")
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
    alert('usuario creado')
}

  

    $.ajax('http://localhost:3000/api/users', {
      method: 'POST',/// si o si SIEMPRE luego de post o put estara la variable data
      data: newUser,
      success: function () {
        // este alert deberia ser un modal :D
        alert('usuario creado');
        location.href = '../html/index.html';
      }
    })
  });