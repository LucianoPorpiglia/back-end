
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

// CORS
app.use(cors());

//Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// RUTAS
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );
// TODO: CRUD: Eventos

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});