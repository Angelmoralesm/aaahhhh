import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {LoginService} from '../../services/login.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private storage: StorageService,private servicio:LoginService ) { }

  ngOnInit(): void {
    let info = this.storage.CargarDatos();
    
    const jsonStr= JSON.stringify(info["data"]);
    var jsonObj = JSON.parse(jsonStr);
    console.log(jsonObj);
    try{
      document.getElementById("nombre")!.innerHTML = jsonObj.usuario;
      document.getElementById("email")!.innerHTML = jsonObj.mail;
      document.getElementById("peso")!.innerHTML = jsonObj.peso + " Kg";
      document.getElementById("objetivo")!.innerHTML = "Objetivo: "+jsonObj.objetivo;
      if(jsonObj.profile_pic != "NaN"){
        document.getElementById("profile_pic")!.setAttribute("src", jsonObj.profile_pic);
      }
    }catch(e){
      console.log("Error al cargar el perfil");
    }
  }

}
