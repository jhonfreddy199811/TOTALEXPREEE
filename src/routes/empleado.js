const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/consul', async (req, res) => {
    const empleado = await pool.query('SELECT * FROM empleado');
    res.render('empleado/consultar', { empleado });

});

router.get('/agregar',async(req,res) =>{
    const empleado = await pool.query('SELECT * FROM empleado');
    res.render('empleado/agregar', {empleado});
    
});

router.post('/agregar',async(req,res) =>{
    const {nombre, apellido, edad, correo, telefono} = req.body;
    const empleado = {nombre, apellido, edad, correo, telefono};
    await pool.query('insert into empleado set ?',[empleado]);
    res.redirect('/empleado/consul');
    
});
router.get('/delete/:id', async(req,res)=>{
    const {id} = req.params;
    const empleado =await pool.query('delete from empleado where id=?',[id]);
    res.redirect('/empleado/consul');
    
});
router.get('/modificar/:id',async(req,res) =>{
    const {id} = req.params;
    const empleado = await pool.query('SELECT * FROM empleado where id=?',[id]);
    console.log(empleado);
    res.render('empleado/modificar', {empleado});
    
});

router.post('/modificar/:id',async(req,res)=>{
    const {  id } = req.params;
    const {nombre, apellido, edad, correo, telefono} = req.body;
    const updateempleado ={nombre, apellido, edad, correo, telefono};
    const produId = await pool.query('update empleado set ? where id =? ',[  updateempleado ,id]);
    
    res.redirect('/empleado/consul');
});


module.exports = router;