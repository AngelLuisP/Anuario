const urlSearchParams = new URLSearchParams(window.location.search);
const idEstudiante = urlSearchParams.get("id");
const container = document.getElementById("container-card");


function showcards(data) {
  console.log(data)
  container.innerHTML = `
  <div class="container d-flex justify-content-center">
  <div class="card mb-3" style="max-width: 730px;">
    <div class="card-body">
      <div class="row g-0">
        <div class="col-md-6">
          <img src="${data[0].photo}" class="card-img-top" alt="...">
          <h3 class="card-title" style="margin-left: 20px; text-align: justify;">Alumno:</h3>
          <h5 class="card-title" style="margin-left: 22px; text-align: justify;">${data[0].fullName}</h5>
          <h3 class="card-title" style="margin-left: 20px; text-align: justify;">Intereses Academicos:</h3>
          <p class="card-title" style="margin-left: 20px; text-align: justify;">${data[0].academicInt}</p>
          <h3 class="card-title" style="margin-left: 20px; text-align: justify;">Metas a corto y largo plazo:</h3>
          <p class="card-title" style="margin-left: 20px; text-align: justify;">${data[0].goals}</p>
          <h3 class="card-title" style="margin-left: 20px; text-align: justify;">Habilidades:</h3>
          <p class="card-title" style="margin-left: 20px; text-align: justify;">${data[0].skills}</p> 
        </div>
        <div class="col-md-6">
          <img src="${data[0].photo_project}" class="card-img-top" alt="..." style="margin-left: 55px;  text-align: justify; width: 250px;">
          <h3 class="card-title" style="margin-left: 20px; text-align: justify;">Titulo del proyecto:</h3>
          <h5 class="card-title" style="margin-left: 25px; text-align: justify;">${data[0].title_project}</h5>
          <h3 class="card-title" style="margin-left: 20px; text-align: justify;">Descripción del proyecto:</h3>
          <h6 class="card-title" style="margin-left: 20px; text-align: justify;">${data[0].description_project}</h6>
        </div>
      </div>
    </div>
  </div>
</div>



  `;
}



  fetch(`/api/student?id=${idEstudiante}`)
    .then((response) => response.json())
    .then((data) => showcards(data))
    .catch((error) => console.error(error));
