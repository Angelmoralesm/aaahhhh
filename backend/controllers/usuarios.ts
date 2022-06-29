var mongoose1 = require('mongoose');
const Usuarios  = mongoose1.model('usuarios');

exports.Authenticate = function(req:any, res:any) {

	let usuarios= new Usuarios({
		usuario:    req.params.usuario,
		clave: 	    req.params.clave
	});
	
    Usuarios.find({usuario:req.params.usuario,clave:req.params.clave},function(err:any, response:any) {
		if(err) return res.send(500, err.message);
      res.status(200).json(response);
	});
   
};