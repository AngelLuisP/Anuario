function registrar(){

    const urlregistrar = "/api/registrarse";
    const urlproyecto = "/api/registrar-proyecto";

    const idnc = document.getElementById("idnc").value;
    const fullname = document.getElementById("fullname").value;
    const semestry = document.getElementById("semestry").value;
    const course = document.getElementById("course").value;
    const profilepicture = document.getElementById("profilepicture");
    const academicInt = document.getElementById("academicInt").value;
    const habilities = document.getElementById("habilities").value;
    const goals = document.getElementById("goals").value;
    const emailex = document.getElementById("emailex").value;
    const password = document.getElementById("password").value;

    const projectname = document.getElementById("projectname").value;
    const projectdesc = document.getElementById("projectdesc").value;
    const projectpic = document.getElementById("projectpic")

    const formRegistrar = new FormData();
    const formProyecto = new FormData();

    formRegistrar.append("code", idnc);
    formRegistrar.append("fullname", fullname);
    formRegistrar.append("carrera", course);
    formRegistrar.append("semestre", semestry);
    formRegistrar.append("interesAcademico", academicInt);
    formRegistrar.append("habilidades", habilities);
    formRegistrar.append("metas", goals);
    formRegistrar.append("correo", emailex);
    formRegistrar.append("contrasena", password);
    formRegistrar.append("photo", profilepicture.files[0]);

    formProyecto.append("code", idnc);
    formProyecto.append("tittleProject", projectname);
    formProyecto.append("descProject", projectdesc);
    formProyecto.append("photo", projectpic.files[0]);    

    fetch(urlregistrar, {
        method: "POST",
        body: formRegistrar,
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    });

    fetch(urlproyecto, {
        method: "POST",
        body: formProyecto,
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
    }).catch((error) => {
        console.log(error);
    });
}