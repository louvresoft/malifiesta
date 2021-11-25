import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public local: String = environment.urlProyect;

  constructor(
    private http: HttpClient,
  ) { }

  getUrlProyect() {
    return this.local;
  }
}
