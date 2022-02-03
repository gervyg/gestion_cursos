
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require("axios")

const { agregarCurso, consultar, editarCurso, eliminarCurso } = require("./consulta");
const { json } = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Crear
app.post("/curso", async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await agregarCurso(nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Leer
app.get("/cursos", async (req, res) => {
    const respuesta = await consultar();
    res.send(respuesta.rows);
});

//Editar
app.put("/curso", async (req, res) => {

    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;    
    const respuesta = await editarCurso(id, nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta);
});

//Eliminar
app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await eliminarCurso(id);
    res.send(respuesta);
})



app.listen(3000, () => console.log("Escuchando el puerto 3000"));