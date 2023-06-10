const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;



app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secreto',
  resave: true,
  saveUninitialized: true
}));

//Configurar el middleware para procesar JSON
app.use(express.json());

//Importando rutas
const appRoutes = require('./routes/rutas');

//Dirname nos da la ruta de acuerdo en donde se ejecute el archivo
app.set('views',path.join(__dirname,'views'));

//archivos publicos
app.use(express.static(path.join(__dirname,'public')));

//Desde el metodo express estamos requiriendo un metodo que permitira
//entender todos los datos que vengan del formulario
app.use(express.urlencoded({extended: false}));

//rutas
app.use('/', appRoutes);

// Iniciar la aplicación
app.listen(port, () => {
console.log(`La aplicación está corriendo en el puerto ${port}`);
});



/*
// Página de inicio de sesión
app.get('/login', (req, res) => {
  res.render(__dirname + '/login.ejs');
});

// Proceso de inicio de sesión
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/');
      } else {
        res.send('Usuario o contraseña incorrectos!');
      }
      res.end();
    });
  } else {
    res.send('Ingresa tu usuario y contraseña!');
    res.end();
  }
});

// Página de registro
app.get('/register', (req, res) => {
  res.render(__dirname + '/register.ejs');
});

// Proceso de registro
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results, fields) => {
      if (error) throw error;
      res.redirect('/login');
     
    });

} else {
res.send('Ingresa tu usuario y contraseña!');
res.end();
}
});

// Proceso de cierre de sesión
app.get('/logout', (req, res) => {
req.session.destroy((err) => {
if (err) throw err;
res.redirect('/');
});
});
*/
// Iniciar la aplicación
/*
app.listen(port, () => {
console.log(`La aplicación está corriendo en el puerto ${port}`);
});
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

