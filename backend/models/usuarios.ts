var mongoose1 = require('mongoose');

exports = module.exports = function(app:any, mongoose:any) {

	var UsuarioSchema = new mongoose1.Schema({
		usuario: 	{ type: String },
		clave: 		{ type: String }
	});

	module.exports=mongoose.model('usuarios', UsuarioSchema);

};