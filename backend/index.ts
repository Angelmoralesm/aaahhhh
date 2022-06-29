const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const cors=require("cors");
require('dotenv').config();

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

// Import Models and controllers
var models     = require('./models/usuarios')(app, mongoose);
var modelExercise     = require('./models/exercise')(app, mongoose)
var UsuariosCtrl = require('./controllers/usuarios');
var exerciseCtrl = require('./controllers/exercise');

const router = express.Router();
router.route('/login/:usuario/:clave')
      .get(UsuariosCtrl.Authenticate);

router.route('/RandomExercise/:id')
      .get(exerciseCtrl.Authenticate);

router.route('/RandomExercise/:diff/:area')
      .get(exerciseCtrl.ExerciseF);

router.route('/RandomExercise/:diff/:area/:name/:id/:demopath/:desc/:duration/:workarea')
    .post(exerciseCtrl.InsertExercise);

app.use('/api',router);


// Connection to DB
mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    }, function(err:any) {
    if(err) throw err;
    console.log('MongoDB ok!!!')
    });


const Configuracion={
    server:process.env.SERVER,
    port : process.env.PORT
};

app.listen(Configuracion,()=>{
    console.log(`servidor escuchando ${Configuracion.server}:${Configuracion.port}`);
});