import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";
import {EjercicioService} from '../../services/ejercicio.service';

@Component({
  selector: 'app-randomexe',
  templateUrl: './randomexe.component.html',
  styleUrls: ['./randomexe.component.scss']
})
export class RandomexeComponent implements OnInit {

  title = 'formRandomExe';

  public formRandomExe!: FormGroup;


  constructor(private formBuilder: FormBuilder,private servicio:EjercicioService ) { 
  }

  ngOnInit(): void {
    this.formRandomExe = this.formBuilder.group({
        dificultad: ['', [Validators.required]],
        area: ['', Validators.required]
    });
  }

  GenerateExercise(): any {
    var dificultad = this.formRandomExe.controls['dificultad'].value;
    var area = this.formRandomExe.controls['area'].value;
    //Obtiene el ejercico, obtiene un Observable se almacena el valor encontrado en val
    this.servicio.RandomExercise(dificultad,area).subscribe(aux=>{
      let exe = aux[0];
      console.log(exe.demopath);
      $(".contenedor").removeAttr("hidden");
                $(".imgexe").attr("src",exe.demopath);
                $("#nameexe").html(exe.name);
                $(".explicacion").html(exe.desc);
                $(".duracion").html(exe.duration);
                $(".workarea").html(exe.workarea);
                document.getElementById("nameexe")!.scrollIntoView({behavior: 'smooth'});
    });
    
    /* 
    $.getJSON("/assets/data/ejercicios.json", function(data) {
        $.each(data.ejercicio,function(i, exe){
            if(dificultad == exe.diff && area == exe.area){
                console.log(dificultad+" + "+area+" = "+exe.name);
                $(".contenedor").removeAttr("hidden");
                $(".imgexe").attr("src",exe.demopath);
                $("#nameexe").html(exe.name);
                $(".explicacion").html(exe.desc);
                $(".duracion").html(exe.duration);
                $(".workarea").html(exe.workarea);
                document.getElementById("nameexe")!.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
    */
  }

randomexeForm = new FormGroup({

});

}
