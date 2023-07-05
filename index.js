const { application } = require('express');
const express = require('express');
const Veiculo = require('./Veiculo');

const app = express();
const port = process.env.PORT ||5000;
require("dotenv").config()

app.listen(port, ()=>{ //usar crase
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.use(express.urlencoded({extended:true}));

//rotas
app.get('/',(req,res)=>{
    res.send("<h1>API - Veículos</h1>");
});

app.get ('/veiculos', async (req,res)=>{
    let resp = await Veiculo.listarVeiculos();
    res.send(resp);
});
app.get('/veiculos', async (req, res) => {
    try {
      const vehicles = await Veiculo.listarVeiculos();
      res.json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ error: 'Error fetching vehicles' });
    }
  });
  
 
  app.post('/veiculos', async (req, res) => {
    try {
      const newVehicle = req.body;
      const result = await Veiculo.adicionarVeiculo(newVehicle);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      res.status(500).json({ error: 'Error adding vehicle' });
    }
  });
  
  
  app.put('/veiculos/:id', async (req, res) => {
    try {
      const vehicleId = req.params.id;
      const updatedVehicle = req.body;
      const result = await Veiculo.atualizarVeiculo(vehicleId, updatedVehicle);
      res.json(result);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).json({ error: 'Error updating vehicle' });
    }
  });
  

  app.delete('/veiculos/:id', async (req, res) => {
    try {
      const vehicleId = req.params.id;
      const result = await Veiculo.removerVeiculo(vehicleId);
      res.json(result);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).json({ error: 'Error deleting vehicle' });
    }
  });
