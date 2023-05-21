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

const uploadIMGProfile = multer({storage: storageType('img-profiles')});
const uploadIMGProjects = multer({storage: storageType('img-projects')});

const dbConfig = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3306,
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'admin',
    database: process.env.DATABASE || 'anuario'
};

const mysqlAction = async (query, payload) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [rows, fields] = await db.execute(query, payload);
        db.end();
        return rows;
    } catch (error){
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

// ======== NO TOUCH ===========================================
app.listen(process.env.SERVER_PORT || 3000,() => {
    console.log(`Server Runnning >>> OK`);
});