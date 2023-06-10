const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '754212',
  database: 'tickets'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión a la base de datos establecida');
});

module.exports = connection;
