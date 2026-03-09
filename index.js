const express = require("express");
const app = express();

const upload = require("./middleware/upload.js");

/*
const multer = require("multer");
const upload = multer({dest: "uploads/"});
*/
const dbConnection = require('./config/database_init.js');

const routesProducts = require('./routes/productosRoutes.js');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/productos", routesProducts);


app.listen(6001, '127.0.0.1', () =>{
    console.log("App en express ejecutandose localmente en el puerto 6001");
    dbConnection();
});

/*

app.get("/", (req, res)=>{
    res.status(200).send("EL PUERTO ESTÁ ESCUCHANDO");
});




app.post('/pdf', upload.single('evidencia'), (req, res) =>{
    console.log(req.headers);
    res.send("Everything ok");
});


app.post('/hi', (req,res)=>{
    console.log("the data: " + req.body);

    res.status(200).send("Data recived");

});*/