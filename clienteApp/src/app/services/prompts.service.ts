import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { PromptsRequest } from '../request/promptsRequest';
import { StorageService } from './storage.service';
import { Prompts } from '../models/prompts';
import { Respuesta } from '../request/respuesta';
import { OpenAi } from '../request/open-ai';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PromptsService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  obtenerDato(user: Number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.get<PromptsRequest>(environment.URL + '/indicacion/GetIndicacion?idUsuario='+ user, httpOptions);
  }

  register(prompt: Prompts): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.post<Respuesta>(environment.URL + '/indicacion', prompt, httpOptions);
  }

  edit(prompt: Prompts): Observable<any> {
    console.log(prompt)
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.patch<Respuesta>(environment.URL + '/indicacion', prompt, httpOptions);
  }

  delete(prompt: Prompts): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.delete<Respuesta>(environment.URL + '/indicacion/' + prompt.id_indicacion, httpOptions);
  }

  getRun(id: Number) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.getToken()}`
      })
    };

    return this.http.get<OpenAi>(environment.URL + '/OpenAI/' + id, httpOptions);
  }
}
