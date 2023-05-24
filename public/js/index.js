const container = document.getElementById("container-cards"); 


function showcards(data) {
    console.log (data)
    data.map((item) => {
        container.innerHTML+=`
        <div class="col-md-4">
            <div class="card">
                <img src="${item.photo}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column align-items-center">
                    <h3 class="card-title" style="margin-left: 0px; text-align: justify;">Alumno:</h3>
                    <h5 class="card-title" style="margin-left: 0px; text-align: justify;">${item.fullName}</h5>
                    <h3 class="card-title" style="margin-left: 0px; text-align: justify;">Interes academico:</h3>
                    <p class="card-title" style="margin-left: 0px; text-align: justify;"> ${item.academicInt}</p>
                    <h3 class="card-title" style="margin-left: 0px; text-align: justify;">Carrera:</h3>
                    <p class="card-title" style="margin-left: 0px; text-align: justify;"> ${item.course}</p>
                <div class="mt-auto">
                    <a href="/ver?id=${item.id}" class="btn btn-primary">Ver mas...</a>
                  </div>
                </div>
            </div>  
        </div>`
    })
    
  
}

fetch(`/api/students`)
  .then(response => response.json())
  .then((data) => showcards(data))
  .catch(error => console.error(error));
