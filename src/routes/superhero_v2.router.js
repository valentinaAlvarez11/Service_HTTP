const express= require('express');
const superheroV2Router = express.Router();
const superhero_v2Schema = require('../models/superhero_v2.model');
const SuperheroService = require('../services/superhero_v2.service')
const service= new SuperheroService();
const Boom=require('@hapi/boom');

superheroV2Router.post('/superhero',async(req,res)=>{
  try{
  const superheroV2 = superhero_v2Schema(req.body);
  const data = await service.createSuperhero(superheroV2)
   res.status(201).json(data);
  }catch(error){
    res.status(404).json({message:error});
  }


});
superheroV2Router.get('/', async (req, res,next) => {
  try{
   const data= await service.find()
    res.status(200).json(data);
  }catch(error){
     next(error);
  }

});

superheroV2Router.get('/:superheroId',async(req,res,next)=>{
  try{
    const {superheroId}= req.params;
    const data =await service.showSuperhero(superheroId);
    res.status(302).json(data);
  } catch(error){
    next(error);
  }


});
superheroV2Router.put('/:superheroId',async(req,res,next)=>{
try{
   const {superheroId}=req.params;
  const {superhero,realname,superpower}= req.body;
  const data = await service.editSuperhero(superheroId,superhero,realname,superpower)
   res.status(200).json(data);
}catch(error){
  next(error);

}
});
superheroV2Router.delete('/:superheroId',async(req,res,next)=>{
  try{
     const {superheroId}= req.params;
     const data = await service.removeSuperhero(superheroId)
      res.status(201).json(data);
    }catch(error){
      next(error);
    }

  });

module.exports= superheroV2Router;