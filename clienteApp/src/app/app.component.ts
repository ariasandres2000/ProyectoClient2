import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clienteApp';
  isLogin = false;
  isAdmin = false;

  constructor(private storageService: StorageService, private route: Router) {
    this.validarSesion();
  }

  validarSesion() {
    this.isLogin = this.storageService.isLoggedIn()

    if (!this.isLogin) {
      this.route.navigate(['/']);  
    } else {
      let user = this.storageService.getUser();

      if (user.tipo == 'A')
        this.isAdmin = true;
      else
        this.isAdmin = false;
    }
  }

  logOut() {    
    this.storageService.clean();
    this.validarSesion();
    this.route.navigate(['/']); 
  }
}
