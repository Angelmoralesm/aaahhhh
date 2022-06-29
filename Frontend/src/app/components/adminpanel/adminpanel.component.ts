import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";
import {EjercicioService} from '../../services/ejercicio.service';
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
  public formAddExe!: FormGroup;
  public formDelExe!: FormGroup;
  public formDelUser!: FormGroup;
  constructor(private formBuilder: FormBuilder, private servicio:EjercicioService) { }

  ngOnInit(): void {
    this.formAddExe = this.formBuilder.group({
      addexename: ['', [Validators.required]],
      addexedesc: ['', Validators.required],
      addexefile: ['', Validators.required],
      addexedur: ['', Validators.required],
      addexeworkarea: ['', Validators.required],
      addexediff: ['', Validators.required],
      addexearea: ['', Validators.required]
    });
    this.formDelExe = this.formBuilder.group({
      delexeid: ['0',Validators.required],
    });
    this.formDelUser = this.formBuilder.group({
      delusermail: ['',[Validators.required,Validators.email]]
    });
  }

  AdminTool(func:string){
    $(".panel").attr("hidden","hidden");
    var tag:string = "#"+func;
    $(tag).removeAttr("hidden");
  }

  AddExe(){
    var nombre = this.formAddExe.controls['addexename'].value;
    var descripcion = this.formAddExe.controls['addexedesc'].value;
    var urlimagen = this.formAddExe.controls['addexefile'].value;
    var dificultad = this.formAddExe.controls['addexediff'].value;
    var tren = this.formAddExe.controls['addexearea'].value;
    var areatrabajada = this.formAddExe.controls['addexeworkarea'].value;
    var idejercicio=0;
    var aux:number = 0;
    this.servicio.InsertExercise(dificultad,areatrabajada,nombre,1000,urlimagen,descripcion,"duration",tren);
    $("#resultadoadd").html("El ejercicio \""+nombre+"\" se ha agregado exitosamente, con ID: "+idejercicio+" (PLACEHOLDER)");
    //lo siguiente asigna un id según el id más alto existente, se debe hacer con API y DB, no con JSON local
    /**
    $.getJSON("/assets/data/ejercicios.json", function(data) {
      $.each(data.ejercicio,function(i, exe){
        if(aux<parseInt(exe.id)){
          aux = parseInt(exe.id);
        }
      });
      idejercicio = (aux+1).toString();
      //aquí es donde se procesaría la info con la API y DB
      $("#resultadoadd").html("El ejercicio \""+nombre+"\" se ha agregado exitosamente, con ID: "+idejercicio+" (PLACEHOLDER)");
      alert("Nombre: "+nombre+"\nDescripción: "+descripcion+"\nDificultad: "+dificultad+"\nTren objetivo: "+tren+"\nArea trabajada: "+areatrabajada+"\nID: "+idejercicio+"\nURL Imagen: "+urlimagen);
    });
     */
    this.ngOnInit();
  }

  DelExe(){
    var delexeid = this.formDelExe.controls['delexeid'].value;
    var encontrado:boolean = false;

    $.getJSON("/assets/data/ejercicios.json", function(data) {
      $.each(data.ejercicio,function(i, exe){
          if(delexeid==parseInt(exe.id)){
            $("#resultadodel").html("Se ha eliminado el ejercicio \""+exe.name+"\" exitosamente (PLACEHOLDER)");
            encontrado = true;
          }
      });
      
      if(encontrado==false){
        $("#resultadodel").html("No existe un ejercicio con ese ID, comprueba e intenta nuevamente");
      }
    });
    this.ngOnInit();
  }

  DelUser(){
    var delusermail = this.formDelUser.controls['delusermail'].value;
    $("#deluserresult").html("Los datos del usuario identificado con el mail \""+delusermail+"\" han sido eliminados exitosamente (PLACEHOLDER)");
    this.ngOnInit();
  }
}
