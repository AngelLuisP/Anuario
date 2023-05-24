const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();


const storageType = (destination) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(`public/storage/${destination}`));
        },
        filename: (req, file, callback) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
            const extension = path.extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
        }
    });
}

const dbConfig = {
    host: process.env.HOST || '74.208.35.203',
    port: process.env.PORT || 3306,
    user: process.env.USER || 'angel',
    password: process.env.PASSWORD || '123',
    database: process.env.DATABASE || 'anuarioangel'
};

const mysqlAction = async (query, payload) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [rows, fields] = await db.execute(query, payload);
        db.end();
        return rows;
    } catch (error){
      console.log(error);
        return null;
    }
};

const servePage = (url, file) => app.get(url, (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, `views/${file}.html`));
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(path.join(__dirname, 'public')));

servePage('/', 'index');
servePage('/acceder', 'acceder');
servePage('/registrarse', 'registrarse');
servePage('/ver', 'ver');
servePage('/admin', 'admin');
    

app.get("/ver", async (req, res) => {

  const { id } = req.params;

  // res.status(2 00).json({ hola: id });
  res.redirect('ver.html');
});

app.get("/api/student", async (req, res, next) => {
    const id = req.query.id;
    
    const payload = [id];

    const data = await mysqlAction("SELECT * FROM students WHERE id = ?", payload);
    if (data === null) {
        res.status(500).json({message: "Ha ocurrido un error en la base de datos"});
    }

    res.status(200).json(data);
});


app.get("/api/students", async (req, res, next) => {
    const data = await mysqlAction("SELECT * FROM students", []);
    if (data === null) {
        res.status(500).json({message: "Ha ocurrido un error en la base de datos"});
    }

    console.log(data)
    res.status(200).json(data);
});
 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now(); // Genera un identificador único basado en la fecha actual en milisegundos
    const fileExtension = path.extname(file.originalname); // Obtiene la extensión del archivo original
    const fileName = uniqueFilename + fileExtension; // Concatena el identificador con la extensión del archivo original
    cb(null, fileName); // Asigna el
  },
  fileFilter: function (req, file, cb) {
    // Verifica la extensión del archivo
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error(
          'Solo se permiten archivos de imagen con extensiones .jpg, .jpeg y .png'
        )
      );
    }
    cb(null, true);
  },
});

const upload = multer({  storage});


app.post("/api/registrarse", upload.single('photo'), async (req, res) => {
  const code = req.body.code;
  const fullname = req.body.fullname;
  const carrera = req.body.carrera;
  const semestre = req.body.semestre;
  const interesAcademico = req.body.interesAcademico;
  const habilidades = req.body.habilidades;
  const metas = req.body.metas;
  const correo = req.body.correo;
  const contrasena = req.body.contrasena;

  let file = "/public/uploads/default.jpg";

  if (req.file){
    file = `/public/uploads/${req.file.filename}`
  }

  const payload = [code, fullname, carrera, semestre, file, interesAcademico, habilidades, metas, "none", "none", "none", correo, contrasena];

  const query = "INSERT INTO students (id, fullName, course, halfYear, photo, academicInt, skills, goals, title_project, description_project, photo_project, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const data = await mysqlAction(query, payload);
  
  if (data === null){
    return res.status(500).json({message: "Ha ocurrido un error al insertar los datos estudinte"})
  }

  res.status(200).json({message: "datos guardados"});

});
  
app.post("/api/registrar-proyecto", upload.single("photo"), async (req, res) => {
  const code = req.body.code;
  const tittleProject = req.body.tittleProject;
  const descProject = req.body.descProject;

  let file = "/public/uploads/default.jpg";

  if (req.file){
    file = `/public/uploads/${req.file.filename}`
  }

  const query = "UPDATE students SET title_project = ?, description_project = ?, photo_project = ? WHERE id = ?";
  const payload = [tittleProject, descProject, file, code];
  const data = await mysqlAction(query, payload);

  if (data === null){
    return res.status(500).json({message: "Ha ocurrido un error al insertar los datos del proyecto"})
  }

  res.status(200).json({message: "datos guardados"});

});

app.get('/api/delete-student', async (req, res) => {
  const id = req.query.id;

  const query = 'DELETE FROM students WHERE nombreDeTuCampo = ?';
  const result = await mysqlAction(query, [id]);
  
  if (result === null) {
    return res.status(500).json({
      message: 'Ha ocurrido un error al eliminar el registro del alumno'
    });
  }
  
  res.redirect(`/admin.html`);
});



// ======== NO TOUCH ===========================================
app.listen(process.env.SERVER_PORT || 3000,() => {
    console.log(`Server Runnning >>> OK`);
});