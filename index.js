
import express from 'express';
import path from 'path'

const app = express();


const __dirname = import.meta.dirname;

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Middleware para capturar el nombre de usuario
const capturarUsuario = (req, res, next) => {
    const nombreUsuario = req.params.usuario;
    console.log('Nombre de usuario capturado:', nombreUsuario);
    req.nombreUsuario = nombreUsuario; // Almacenamos el nombre de usuario en el objeto 'req' para que esté disponible en otras rutas
    next(); 
};

// Array de usuarios
const usuarios = [
    { id: 1, nombre_usuario: 'joaquin' },
    { id: 2, nombre_usuario: 'elias' }
];

app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});
// Ruta para obtener un usuario específico y verificar si existe ARREGLAR
app.get('/abracadabra/juego/:usuario', capturarUsuario, (req, res) => {
    const nombreUsuario = req.nombreUsuario;
    const usuarioEncontrado = usuarios.find(user => user.nombre_usuario === nombreUsuario);

    const who = '/public/assets/img/who.jpeg';

    if (usuarioEncontrado) {
        res.send("Usuario existe en la base de datos");
    } else {
        res.sendFile(path.join(__dirname, '/public/assets/img/who.jpeg'));
        console.log(path.join(__dirname, '/public/assets/img/who.jpeg'))
    }
});


app.get('/abracadabra/conejo/:n', capturarUsuario, (req, res) => {
    const numeroConejo = req.params.n;
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    if (getRandomIntInclusive(1,4) === parseInt(numeroConejo)) {
        res.sendFile(path.join(__dirname, '/public/assets/img/conejito.jpg'))
    } else {
        res.sendFile(path.join(__dirname, '/public/assets/img/voldemort.jpg'))

    }
});

//. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al
//consultar una ruta que no esté definida en el servidor. (

app.use((req, res, next) => {
    res.status(404).send("Página no encontrada");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});