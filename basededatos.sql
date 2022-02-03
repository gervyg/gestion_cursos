--Creando Base de Datos
CREATE DATABASE cursos;

--Conectando a la base de Datos
\c cursos
--Creando Tabla Cursos.
CREATE TABLE cursos 
(id SERIAL PRIMARY KEY, 
nombre VARCHAR(50), 
nivel INT, 
fecha DATE, 
duracion INT);
