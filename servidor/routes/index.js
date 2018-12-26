var express = require('express');
var path = require("path"); /// este modulo me permite trabajar con cualquier sistema operativo
var router = express.Router();
const fs = require('fs');
let usuarios= fs.readFileSync('users.json');///primero lee el objeto user.json
usuarios=JSON.parse(usuarios)


/* GET home page. */

//Se debe crear una aplicación cliente / servidor, con Express, con los siguientes requerimientos:
//Atienda a la ruta /ping y devuelva la palabra pong
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
})
// ruta con el formulario lleno para  editar 
router.get("/users/edit", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "html", "edit.html"));
})

/// ruta con todos los usuarios los leo y parseo como objeto
router.get("/api/users", function (req, res) {
   res.json(usuarios)
   console.log("aqui cambie y me trajo")
   
})

// punto de entrada para guardar

router.post("/api/users", function (req, res) {
  const user = req.body/// //req.body es una caja donde guardamos informacion para mandarla cuando hacemos una llamada http
  /// body no existe para get ni pata delete
  const newId=usuarios.length=== 0 ?(1):(usuarios[usuarios.length-1].id+1) ///ternario
 /// le agrega el numero de id incrementando uno
 user.id = newId //le creo el id 

 // ahora las validaciones
//  if(user.name ===0){///
//    return res.status(400).end("el nombre de la tarea es obligatoria")

//  }
//  function validateEmail(email) {
//   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email.toLowerCase());
// }

 /// ojo  aca  arriba validamos que la informacion este bien 
  usuarios.push(user)
  fs.writeFileSync("users.json",JSON.stringify(usuarios))
  res.json(usuarios)/// es para ver el resultado de la llamada
  console.log(user)
})

/// lo que esta luego de los 2 puntos es dinamico y es lo que me va a mostrar dependiendo de lo que pida
router.get('/api/users/:id', function (req, res, next) {
 
  const id = req.params.id/// lee las partes dinamicas y devuelve un objeto con la parte dinamica 
  for (let i = 0; i < usuarios.length; i++) {
    if (id == usuarios[i].id) {
      return res.json(usuarios[i])///responde en formato json mi array
    }
  }
  console.log(usuarios)
  console.log(req.params.id) ///   un objeto con los parametros dinamicos de una url donde la clave
  // de ese objeto es lo que esta despues de : y el valor es lo que pongamos en nuestro navegador y siempre devuelve un string

});


//// para agregar un nuevo usuario al array
/// el body es un lugar donde vamos a guardar la informacion a la hora de hacer una llamada http cuyo verbo sea post o put
//.post

/// modificar un usuario


router.put('/api/users/:id', function (req, res, next) {
  const id = req.params.id ///capta el contenido de forma dinamica de una url
  console.log("id es " + id)
  const user = req.body
  console.log('gjffdhggf ',usuarios)
  const bodyKeys = Object.keys(user)
  console.log(user)

  //// AQUI VALIDAMOS QUE TODOS LOS DATOS DE LOS INPUT ESTEN OK
  // NOMBRE DEL OBJETO.PARAMETRO
  if(user.name.length === 0 || user.name.length >= 30 || /^\s+$/.test()) {
    return res.status(400).send('Debe ingresar un nombre con menos de 30 caracteres')
  } else if (user.surname.length == 0 || user.surname.length >= 30 || /^\s+$/.test(surname) ) {
    return res.status(400).send(' Debe ingresar un apellido con menos de 30 caracteres')
  } else if(/^\d+$/.test(user.phone)) {
    return res.status(400).send(' Debe ingresar un telefono valido')
  }
  if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
    return res.status(400).send('lol xd Debe ingresar email valido')
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
       alert("entro al servidor")
     return res.json(currentUser)
    
    }
    console.log(currentUser);
  }
    //aqui el modal
      alert('paso las validaciones y puedo editar')
  }

 
 });
///Leer el valor
//Buscarlo en el array de usuarios
//Borrar el objeto del array
// usar splice

router.delete('/api/users/:id', function (req, res, next) {
  const id = req.params.id /// aqui accedo al parametro id y asi se a quien voy a borrar
  for (let i = 0; i < usuarios.length; i++) {
    if (id == usuarios[i].id) {
      usuarios.splice(i, 1) /// al splice le paso q indice quiero eliminar y cuantas veces
    }
    fs.writeFileSync("users.json",JSON.stringify(usuarios))
  }
  res.send("ok") /// siempre en un delete debe haberlo
})





module.exports = router


/// como crear todo el front end crear 4 rutas distintas
// usuarios debe mostrar en un html 

// /users
// /users/new
// /users/edit


// /api/users --> get
//  --> FILTRO

// /api/users --> post
//  --> VALIDAR los datos
//  --> grabar el archivo en users.js
//  --> devolver un mensaje de error

// /api/users/:id --> put
//  --> VALIDAR los datos
//  --> buscamos el user a editar
//  --> grabar el archivo (los cambios) en users.js
//  --> devolver un mensaje de error

// /api/users/:id --> delete
//  --> buscamos el user a eliminar
//  --> eliminar