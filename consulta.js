const url = require('url')
const { Pool } = require("pg");
const { query } = require('express');

//conexión a base de datos PostgreSQL.

const config = {
    user: "postgres",
    host: "localhost",
    password: "0718",
    database: "cursos",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

//crear curso

const agregarCurso = async (nombre, nivel, fecha, duracion) => {

    const inserta = `INSERT INTO cursos (nombre, nivel, fecha, duracion) 
        values ('${nombre}', '${nivel}', '${fecha}', '${duracion}') RETURNING *`;

    try {
        const result = await pool.query(inserta);

        return result;
    } catch (error_inserta) {
        console.log('Error inserción');
        return error_inserta;
    }
};

//Consultando curso
const consultar = async () => {
    try {
        const result = await pool.query("SELECT * FROM cursos");
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

// Editando Curso
async function editarCurso(id, nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const res = {
            text: `UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion= $5 WHERE id = $1 RETURNING *`,
            values: [id, nombre, nivelTecnico, fechaInicio, duracion]
        }

        const result = await pool.query(res);
        return result


    } catch (e) {
        console.log(e);
    }
}
//Eliminando Curso
const eliminarCurso = async (id) => {
    try {
        const consulta = {
            text: `DELETE FROM cursos WHERE id = $1`,
            values: [id]
        };
        const result = await pool.query(consulta);
        return result.rows
    }
    catch (e) {
        return e;
    }

}




module.exports = { agregarCurso, consultar, editarCurso, eliminarCurso }