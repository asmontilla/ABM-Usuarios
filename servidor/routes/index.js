var express = require('express');
var path = require("path"); 
var router = express.Router();
const fs = require('fs');
var usuarios= fs.readFileSync('users.json');
usuarios=JSON.parse(usuarios) 


/* GET home page. */


router.get("/ping", function (req, res) {
  res.send("Pong!!")
})
/// Ruta que me muestra todos los usuarios creados
router.get("/users",function(req, res) {
   res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"));  
})
/// ruta para navegar al formulario esta es para ingresar un usuario nuevo
router.get("/users/new", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "html", "new.html"));
});
// ruta con el formulario lleno para  editar 
router.get("/users/edit", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "html", "edit.html"));
})

// /api/users --> get
//  --> FILTRO


router.get('/api/users', function(req, res,) {

  let contenidoDeMiUsuarios = usuarios; 
  const filterInput = req.query.search;
 
  if(filterInput && filterInput.length > 0){
 
    contenidoDeMiUsuarios = contenidoDeMiUsuarios.filter(function (f) {
      return f.name.toLowerCase().indexOf(filterInput.toLowerCase())>=0||
      f.surname.toLowerCase().indexOf(filterInput.toLowerCase()) >= 0 ||
      f.phone.toLowerCase().indexOf(filterInput.toLowerCase()) >= 0 ||
      f.email.toLowerCase().indexOf(filterInput.toLowerCase()) >= 0
    });

 
  }
 
  res.json(contenidoDeMiUsuarios);
 
 });

// /api/users --> post
//  --> VALIDAR los datos
//  --> grabar el archivo en users.js
//  --> devolver un mensaje de error

router.post("/api/users", function (req, res) {
  const user = req.body
  /// body no existe para get ni pata delete
  // si la longitud del usuario es cero asignale el id 1 de lo contrario 
  const newId=usuarios.length=== 0 ?(1):(usuarios[usuarios.length-1].id+1) ///ternario
 /// le agrega el numero de id anterior y le  incrementa uno
 user.id = newId //le creo el id 

 if(user.name.length === 0 || user.name.length >= 30 ) {
  return res.status(400).end('Debe ingresar un nombre con menos de 30 caracteres')
} else if (user.surname.length == 0 || user.surname.length >= 30  ) {
  return res.status(400).end(' Debe ingresar un apellido con menos de 30 caracteres')
} else if(!/^\d+$/.test(user.phone)) {
  return res.status(400).end(' Debe ingresar un telefono valido')
}
if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
  return res.status(400).end('lol xd Debe ingresar email valido')
}else{
  usuarios.push(user)
  fs.writeFileSync("users.json",JSON.stringify(usuarios))
  res.json(usuarios)
  console.log(user)
   }
  })

/// Ruta a mi api con el id que seleccione 
router.get('/api/users/:id', function (req, res, next) {
 
  const id = req.params.id
  for (let i = 0; i < usuarios.length; i++) {
    if (id == usuarios[i].id) {
      return res.json(usuarios[i])///responde en formato json mi array
    }
  }
  console.log(usuarios)
  console.log(req.params.id) 

});

/// modificar un usuario
// /api/users/:id --> put
//  --> VALIDAR los datos
//  --> buscamos el user a editar
//  --> grabar el archivo (los cambios) en users.js
//  --> devolver un mensaje de error


router.put('/api/users/:id', function (req, res, next) {
  const id = req.params.id ///capta el contenido de forma dinamica de una url
  const user = req.body
  const bodyKeys = Object.keys(user)
  console.log(user)

  if(user.name.length === 0 || user.name.length >= 30 ) {
    return res.status(400).end('Debe ingresar un nombre con menos de 30 caracteres')
  } else if (user.surname.length == 0 || user.surname.length >= 30  ) {
    return res.status(400).end(' Debe ingresar un apellido con menos de 30 caracteres')
  } else if(!/^\d+$/.test(user.phone)) {
    return res.status(400).end(' Debe ingresar un teléfono valido')
  }
  if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
    return res.status(400).end('Debe ingresar email valido')
  }else{
    for (let i = 0; i < usuarios.length; i++) {
      const currentUser = usuarios[i]
      if (id == currentUser.id) {
        const userKeys = Object.keys(currentUser)/// como ver todas las claves de un objeto genera un array con todas las claves
        console.log(userKeys)
        console.log(bodyKeys)
        for (let x = 0; x < bodyKeys.length; x++) {
          const currentBodyKey = bodyKeys[x]/// cada una de las claves
          if (userKeys.indexOf(currentBodyKey) > -1) {// index off me da la posicion del elemento en el array
            currentUser[currentBodyKey] = user[currentBodyKey]
            //si queremos acceder a una clave variable dentro de un objeto lo hacemos con los corchetes
          } else {
            console.log(`${currentBodyKey} no es una clave valida`)
          }
        }
         fs.writeFileSync("users.json",JSON.stringify(usuarios))
      
       return res.json(currentUser)
      
      }
      console.log(currentUser);
    }
    
 location.href = '../html/index.html';
  }
  });

  
// /api/users/:id --> delete
//  --> buscamos el user a eliminar
//  --> eliminar

router.delete('/api/users/:id', function (req, res, next) {
  const id = req.params.id /// aqui accedo al parametro id y asi se a quien voy a borrar
  for (let i = 0; i < usuarios.length; i++) {
    if (id == usuarios[i].id) {
      usuarios.splice(i, 1) /// al splice le paso q indice quiero eliminar y cuantas veces
    }
    fs.writeFileSync("users.json",JSON.stringify(usuarios))
  }
  res.send("ok") /// siempre en un delete debe haber respuesta
});





module.exports = router

