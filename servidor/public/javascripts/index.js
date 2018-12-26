$.ajax('http://localhost:3000/api/users').done(function (data) {
        console.log(data);
        /// data me trae todo lo que contiene la url a la que estoy llamando en este caso a la api/user

        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            $('#tab').append(`<tr id="file${data[i].id}">
            <td id="nom">${data[i].name}</td>
            <td id="ape">${data[i].surname}</td>
            <td id="pho">${data[i].phone}</td>
            <td id="mail">${data[i].email}</td>
            <td><a href="/users/edit?id=${data[i].id}"><button id="put">Editar</button></a></td>
            <td><button type='button' onclick="eliminar(${data[i].id})"class="btn" id="borrar">Borrar</button></td> 
        </tr>`)
        }
})

//borrar busco en el ejercicio
function eliminar (id) {
    $.ajax('http://localhost:3000/api/users/' + id, {
        method: 'DELETE',
        success: function(){
            $('#file' + id).remove();
        }
    })
}