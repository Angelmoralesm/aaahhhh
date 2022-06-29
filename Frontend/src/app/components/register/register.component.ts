import { CompilerFactory, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";
import { ConfirmedValidator } from '../../confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title='formRegister';
  public formRegister!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password1: ['',Validators.required],
      password2: ['',Validators.required]
    }, {
      validator: ConfirmedValidator('password1','password2')
  })
  }
  mostrar(): any{
    var usuario = this.formRegister.controls['username'].value;
    var correo = this.formRegister.controls['email'].value;
    var contra1 = this.formRegister.controls['password1'].value;
    var contra2 = this.formRegister.controls['password2'].value;
    alert("Usuario: "+usuario+"\nEmail: "+correo+"\n1era contraseña: "+contra1+"\n2da contraseña: "+contra2+"\nAquí se obtienen los datos, se procesan en la API del angel");
  }

}
