import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import  { StorageService } from '../../services/storage.service'
import * as alertyfy from 'alertifyjs';
import { Router } from '@angular/router';
import { FormGroup,  FormControl,  Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { environment } from 'src/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formData = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(', Validators.required'),
 });

  constructor(private route: Router, private userService: UserService, private storageService: StorageService) { 
    this.validarSesion();
  }

  ngOnInit() {

  }

  validarSesion() {
    if (this.storageService.isLoggedIn()) {
      this.reloadPage();
    }
  }

  onSubmit(form: any) {
    this.userService.login(form.userName, form.password).subscribe(data => {
        if (!data.error) {
          let user: User = {
            id_usuario: data.data.id_usuario,
            nombre: data.data.nombre,
            apellido: data.data.apellido,
            correo: data.data.correo,
            contrasena: data.data.contrasena,
            tipo: data.data.tipo
          }
          console.log(data.token)
          this.storageService.saveToken(data.token);

          this.storageService.saveUser(user);        
          this.reloadPage();
        } else {
          this.formData.controls['password'].setValue('');
          alertyfy.error(data.mensajeError);
        } 
      },
      error => {
        alertyfy.error("A ocurrido un error intente más tarde.");
      }
    );
  }

  reloadPage(): void {
    this.route.navigate(['/home']);  
  }
}
