import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";
import {Session} from '../../session';
import {LoginService} from '../../services/login.service';
import {StorageService} from '../../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title='formLogin';
  public formLogin!: FormGroup;
  mensaje:string="";
  token:string="";
  logueado:Boolean=false;
  datos:Session;

  constructor(private formBuilder: FormBuilder, private storage: StorageService, private servicio:LoginService ,private route:Router) {
    this.datos=new Session("","");
  }
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    if(this.storage.getCurrentUser()){
      this.logueado=true;
      this.mensaje="Usted ya se encuentra logueado";
      console.log("usted ya se encuentra logeado");
    }
  }

  mostrar(): any{
    
    let usuario = this.formLogin.controls['username'].value;
    let contra = this.formLogin.controls['password'].value;
    //alert("Usuario: "+usuario+"\nContraseña: "+contra+"\nAquí se obtienen los datos, se procesan en la API");
    this.servicio.ValidarLogin(usuario, contra).subscribe(datos=>{
      this.isAdmin(usuario,contra);
      if(datos.length==0){
          //this.mensaje="Login no existe";
        alert("Usuario Inexistente");
       }else{
        console.log(datos);
          datos={token:datos[0]._id,data:datos[0]};
          
          this.storage.CrearSession(datos);
          
          window.location.href="/profile";
       }
    });
  }
  
  isAdmin(user:String,password:String): any{
    if(user=="nsfwteam" && password=="123"){
      alert("eres administrador");
      this.route.navigate(['/adminpanel']);
    }
  }
    
}
