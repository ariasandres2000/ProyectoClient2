import { Component } from '@angular/core';
import * as alertyfy from 'alertifyjs';
import { Router } from '@angular/router';
import { FormGroup,  FormControl,  Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', Validators.required),
    contrasenaConf: new FormControl('', Validators.required)
 });

 constructor(private userService: UserService, private route: Router) {}

  onSubmit(form: any) {
    if (form.contrasena == form.contrasenaConf) {
      let user: User = {
        id_usuario: 0,
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        contrasena: form.contrasena,
        tipo: 'N'
      };

      this.userService.register(user).subscribe(data => {
          if (!data.error) {      
            this.reloadPage();
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

  reloadPage(): void {
    this.route.navigate(['/']);  
  }
}
