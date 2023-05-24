const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");
const alumnos = document.getElementById("anuncios");


function showData (data) {

    alumnos.innerHTML += `
    <h1>${data[0].fullName}</h1>

    <picture class="alumno-descripcion">
        <img loading="lazy" src="${data[0].photo}" alt="imagen de la propiedad">
    </picture>

    <div class="resumen-propiedad">
        <p class="precio">${data[0].course}</p>


        <h2>Intereses Académicos</h2>
        <p id="StudentIntereses">${data[0].academicInt}</p>

        <h2>Habilidades y Fortalezas</h2>
        <p id="StudentHabilidades">${data[0].Habilidades}</p>

        <h2 id="StudenGoals">Metas a Corto y Largo Plazo</h2>
        <p>${data[0].goals}</p>

        <h2 id="projectName">${data[0].title_project}</h2>
        <picture class="alumno-descripcion">
            <img loading="lazy" src="${data[0].photo_project}" alt="imagen de la propiedad">
        </picture>
        <p id="projectDescription">${data[0].description_project}</p>

    </div> 
    `;
}



fetch(`/api/student?id=${id}`)
  .then(response => response.json())
  .then(data => showData(data))
  .catch(error => {
    console.error(error);   
    });