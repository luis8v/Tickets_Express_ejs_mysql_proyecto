const express = require('express');
const path = require('path');
const connection = require('../db');
const router = express.Router();


// Página de inicio
router.get('/', (req, res) => {
    res.render(path.join(__dirname,'../views/index'));

});

// Página de espedicion tickets
router.get('/ticket', (req, res) => {
    res.render(path.join(__dirname,'../views/ticket'));
});

// Página de espedicion tickets
router.get('/tickets', (req, res) => {
    const sql = 'SELECT * FROM ticket WHERE status = 0';
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });    
});

router.post('/ticket', (req,res) => {
    ticketData=req.body
    var id_modulo = 1
    var descripcion
    var status = 0

    if (ticketData.tipo === "usuario"){
        descripcion = `A`
        cliente = 1
    }else if (ticketData.tipo === "espontaneo"){
        descripcion = `B`
        cliente = 0
    }else{
        console.log('Tipo de ticket inválido');
    }
    connection.query("CALL insertar_ticket(?, ?, ?, ?)", [id_modulo, descripcion, status, cliente], (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    console.log(`Ticket creado con éxito: ${JSON.stringify(ticketData)}`)

});

// Página de caja
router.get('/caja1', (req, res) => {

    res.render(path.join(__dirname,'../views/caja1'));
      
});

router.post("/caja1",(req,res) =>{
    cajaData = req.body
    id_caja = cajaData.id_modulo
    connection.query("CALL actualizar_ticket(?)", [id_caja], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render(path.join(__dirname,'../views/ticket'));
    });
    res.redirect("/tickets")
});

// Página de caja
router.get('/caja2', (req, res) => {

    res.render(path.join(__dirname,'../views/caja2'));
      
});

router.post("/caja2",(req,res) =>{
    cajaData = req.body
    id_caja = cajaData.id_modulo
    connection.query("CALL actualizar_ticket(?)", [id_caja], (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    res.redirect("/tickets")
});


module.exports = router