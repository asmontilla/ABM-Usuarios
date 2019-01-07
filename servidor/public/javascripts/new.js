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
    /// aqui remover los display none de cada una de las letras rojas q van debajo de los input
    $ ("#redName").html("El nombre debe poseer menos de 30 caracteres")
    return;/// es para indicar que la funcion cierra aqui
  }else if (surname.length == 0 || surname.length >= 30 || /^\s+$/.test(surname) ) {
    $ ("#redSurname").html("El apellido debe poseer menos de 30 caracteres")
    return false;
} else if(!(/^\d{10}$/.test(phone) )) {
  $ ("#redPhone").html("El telefono introducido es incorrecto")
    return false;
} else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    console.log(email)
    $ ("#redMail").html("El email introducido no es valido")
    return false;
} else{
  $.ajax('http://localhost:3000/api/users', {
    method: 'POST',/// si o si SIEMPRE luego de post o put estara la variable data
    data: newUser,
    success: function () {
      Swal("Genial", 'El usuario fue creado',"success");
      setTimeout (function(){
        location.href = '../html/index.html';
      },2000)
     
    }
  })
  
}
});
  

 