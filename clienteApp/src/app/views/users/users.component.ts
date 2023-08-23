import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import * as alertyfy from 'alertifyjs';
import { FormGroup,  FormControl,  Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  isFormVisible = false;
  users: any;
  isEdit = false;
  formData = new FormGroup({
    id_usuario: new FormControl(0),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    contrasenaConf: new FormControl('', Validators.required),
    tipo: new FormControl('U', Validators.required)
  });

  constructor(private storageService: StorageService, private route: Router, private userService: UserService) {
    this.validarSesion();
    this.getData();
  }

  validarSesion() {
    if (!this.storageService.isLoggedIn()) {
      this.route.navigate(['/']);  
    }
  }

  getData() {
    this.users = [];

    this.userService.obtenerDato().subscribe((resp) => {
      if (!resp.error) {
        this.users = resp.data;
      } else {
        alertyfy.error(resp.mensajeError);
      }
    },
    (error) => {
      alertyfy.error("A ocurrido un error intente más tarde.");
    });
  }

  save(form: any) {
    if (form.id_usuario > 0) {
      if (form.contrasena == form.contrasenaConf) {
        let user: User = {
          id_usuario: form.id_usuario,
          nombre: form.nombre,
          apellido: form.apellido,
          correo: form.correo,
          contrasena: form.contrasena,
          tipo: form.tipo
        };
      
        this.userService.edit(user).subscribe(data => {
            if (!data.error) {
              this.getData();
              this.isFormVisible = false;
            } else {          
              alertyfy.error(data.mensajeError);
            } 
          },
          error => {
            alertyfy.error("A ocurrido un error intente más tarde.");
          }
        );
      } else {
        alertyfy.warning("Las contraseñas son diferentes.");
      }
    } else {      
      if (form.contrasena == form.contrasenaConf) {
        let user: User = {
          id_usuario: form.id_usuario,
          nombre: form.nombre,
          apellido: form.apellido,
          correo: form.correo,
          contrasena: form.contrasena,
          tipo: form.tipo
        };
      
        this.userService.register(user).subscribe(data => {
            if (!data.error) {
              this.getData();
              this.isFormVisible = false;
            } else {          
              alertyfy.error(data.mensajeError);
            } 
          },
          error => {
            alertyfy.error("A ocurrido un error intente más tarde.");
          }
        );
      } else {
        alertyfy.warning("Las contraseñas son diferentes.");
      }
    }    
  }

  edit(user: any) {
    this.formData.controls['id_usuario'].setValue(user.id_usuario);
    this.formData.controls['nombre'].setValue(user.nombre);
    this.formData.controls['apellido'].setValue(user.apellido);
    this.formData.controls['correo'].setValue(user.correo);
    this.formData.controls['contrasena'].setValue(user.contrasena);
    this.formData.controls['contrasenaConf'].setValue(user.contrasena);    
    this.formData.controls['tipo'].setValue(user.tipo);
    this.isEdit = true;
    this.isFormVisible = true;
  }

  deleteU(user: any) {
    this.userService.delete(user.id_usuario).subscribe(data => {
      if (!data.error) {
        this.getData();
        this.isFormVisible = false;
      } else {          
        alertyfy.error(data.mensajeError);
      } 
    },
    error => {
      alertyfy.error("A ocurrido un error intente más tarde.");
    }
  );
  }
}
