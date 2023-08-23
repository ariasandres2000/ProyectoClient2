import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAdmin = false;
  user: any;

  constructor(private storageService: StorageService, private route: Router) {
    this.validarSesion();
  }

  validarSesion() {
    if (!this.storageService.isLoggedIn()) {
      this.route.navigate(['/']);  
    } else {
      this.user = this.storageService.getUser();
    }
  }
  
}
