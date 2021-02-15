const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', async (req,res) =>{
    //res.send('Oh yeah');
    const usuarios = await pool.query('select * from usuarios');
    res.render('links/add', { usuarios });
});


router.post('/add',async(req,res)=>{

    const  {nombre, apellido, edad,} = req.body;
    const newUser ={nombre, apellido, edad,};

    await pool.query('insert into usuarios set ?', [newUser]);
    res.redirect('/links/add');

});


router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const usuarios = await pool.query('delete from usuarios where id=?',[id]);
    res.redirect('/links/add');
});

router.get('/modificar/:id',async(req,res) =>{
    const {id} = req.params;
    const usuarios = await pool.query('SELECT * FROM usuarios where id=?',[id]);
    console.log(usuarios);
    res.render('links/modificar', {usuarios});
    
});

router.post('/modificar/:id',async(req,res)=>{
    const {  id } = req.params;
    const {nombre, apellido, edad, } = req.body;
    const updateusuarios ={nombre, apellido, edad, };
    const produId = await pool.query('update usuarios set ? where id =? ',[  updateusuarios ,id]);
    
    res.redirect('/links/add');
});


module.exports = router;