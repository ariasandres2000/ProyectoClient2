import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Login } from '../request/login';
import { User } from '../models/user';
import { Respuesta } from '../request/respuesta';
import { StorageService } from './storage.service';
import { UserRequest } from '../request/userRequest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(username: string, password: string): Observable<any> {
    let usuario = {
      correo: username,
      contrasena: password,
    };

    return this.http.post<Login>(environment.URL + '/usuario/session', usuario, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post<Respuesta>(environment.URL + '/usuario/register', user, httpOptions);
  }

  obtenerDato() {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.get<UserRequest>(environment.URL + '/usuario', httpOptions);
  }

  save(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.post<UserRequest>(environment.URL + '/usuario', user, httpOptions);
  }

  edit(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.patch<UserRequest>(environment.URL + '/usuario', user, httpOptions);
  }
  
  delete(user: Number) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.delete<UserRequest>(environment.URL + '/usuario/' + user, httpOptions);
  }
}
