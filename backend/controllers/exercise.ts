var mongoose1 = require('mongoose');
const Exercise  = mongoose1.model('exercise');

//Busca ejercicio mediante id (POST)
exports.Authenticate = function(req:any, res:any) {
	
	let exercise = new Exercise({
		diff: req.params.diff,
		area: req.params.area,
		name: req.params.name,
		id: req.params.id,
		demopath: req.params.demopath,
		desc: req.params.desc,
		duration: req.params.duration,
		workarea: req.params.workarea
	});

	Exercise.find({id:req.params.id},function(err:any, response:any) {
		if(err) return res.send(500, err.message);
      res.status(200).json(response);
	});
	/*
	Exercise.collection.insertOne({id:req.params.id}),function(err:any, response:any){
		if(err) return res.send(500, err.message);
		res.status(200).json(response);
	}
   */
};
//Busca Ejercicio mediante dificualtad y area (POST)
exports.ExerciseF = function(req:any, res:any) {
	
	let exercise = new Exercise({
		diff: req.params.diff,
		area: req.params.area,
		});
    
	Exercise.find({diff:req.params.diff , area: req.params.area},function(err:any, response:any) {
		if(err) return res.send(500, err.message);
      res.status(200).json(response);
	});
   
};

//Inserta un nuevo registro a la bd (POST)
exports.InsertExercise = function(req:any, res:any) {
	
	let exercise = new Exercise({
		diff: req.params.diff,
		area: req.params.area,
		name: req.params.name,
		id: req.params.id,
		demopath: req.params.demopath,
		desc: req.params.desc,
		duration: req.params.duration,
		workarea: req.params.workarea
	});
	
	Exercise.collection.insertOne(exercise),function(err:any, response:any){
		if(err) return res.send(500, err.message);
		console.log("Insertado");
	}
   
};

exports.DeleteExercise = function(req:any, res:any) {
	
	let exercise = new Exercise({
		id: req.params.id,
	});
	
	Exercise.collection.metodo_paraliminar({id:exercise.id}),function(err:any, response:any){
		if(err) return res.send(500, err.message);
		res.status(200).json(response);
	}
   
};