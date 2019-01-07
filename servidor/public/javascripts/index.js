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
            <td><a href="/users/edit?id=${data[i].id}"><button id="put"><i class="fas fa-pencil-alt"></i></button></a></td>
            <td><button type='button' onclick="eliminar(${data[i].id})"class="btn" id="borrar"><i class="far fa-trash-alt"></i></button></td>

        </tr>`)
        }
})
$("#filter").on("click",function(){
    const valorFiltro= $("#input").val();
    $("#file").remove();
    $.ajax("http://localhost:3000/api/users?search=" + valorFiltro)
    .done(function(data){
        $("#file").remove();
        for(let i = 0; i < data.length; i++){
            $("#tab").append(`<tr id="file${data[i].id}">
            <td id="nom">${data[i].name}</td>
            <td id="ape">${data[i].surname}</td>
            <td id="pho">${data[i].phone}</td>
            <td id="mail">${data[i].email}</td>
            <td><a href="/users/edit?id=${data[i].id}"><button id="put"><i class="fas fa-pencil-alt"></i></button></a></td>
            <td><button type='button' onclick="eliminar(${data[i].id})"class="btn" id="borrar"><i class="far fa-trash-alt"></i></button></td>

        </tr>`)
        }


    })

})

function eliminar (id) {
    $.ajax('http://localhost:3000/api/users/' + id, {
        method: 'DELETE',
        success: function(){         
Swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
            // Swal("Espera", 'Seguro que desea eliminar el usuario?',"success");
            $('#file' + id).remove();
        }
    })
}