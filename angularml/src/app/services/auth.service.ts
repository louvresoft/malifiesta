import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
import { takeUntil, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
//declare var swal: any;
import Swal from 'sweetalert2';
// Redux
import { Store } from '@ngxs/store';
import {
  AddToken,
  AddSessionToken,
  Logout
} from '../shared/redux/auth.actions';
import { UserAuthState } from '../shared/redux/auth.state';
import { UserInformationState } from '../shared/redux/user.state';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  public local: String = environment.urlProyect;
  private jwtHelper: any = new JwtHelperService();
  private sessionTokenSubscription: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private userService: UserService
  ) {}

  ngOnDestroy() {}

  getUrlProyect() {
    return this.local;
  }

  loginService(data:any) {
    const url: any = this.getUrlProyect() + 'api/token/';
    return this.http.post(url, data);
  }

  verifyTokenLogin(data:any) {
    return this.http.post(
      this.getUrlProyect() + 'api/token/',
      data
    );
  }

  createUserService(data:any) {
    const url: any = this.getUrlProyect() + 'api/v1/users/';
    console.log('>>createUserService: ', data);
    return this.http.post(url, data);
  }

  updateUserService(data:any) {
    console.log('usuario datos enviados', data);
    var token = this.getToken();
    const url: any = this.getUrlProyect() + 'api/v1/users/modify/';
    console.log('entraste a modificar usuario');
    return this.http.put(url, data);
  }

  checkTokenExpirationDate() {
    const token = this.store.selectSnapshot(UserAuthState).token;
    const firebase = this.store.selectSnapshot(UserAuthState).firebase;
    const uid =
      this.store.selectSnapshot(UserInformationState) == null
        ? null
        : this.store.selectSnapshot(UserInformationState).id;
    if (token && firebase && uid) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.logout();
        return false; // Ya no es valido el token
      } else {
        this.userService
          .getUserInformation()
          .pipe(take(1))
          .subscribe(res => {
            const sessionToken = this.store.selectSnapshot(UserAuthState)
              .session;
            console.log(sessionToken);
            // console.log(res['updated'])
            if (sessionToken) {
              if (sessionToken !== res['updated']) {
                this.logout();
                Swal.fire({
                  title: 'Estimado Usuario',
                  text: `Alguien mas ha iniciado sesion con su cuenta, recuerde que solo puede conectarse una persona simultaneamente`,
                  icon: 'warning',
                  allowOutsideClick: false
                }).then(result => {
                  window.location.reload();
                });
              }
            } else {
              this.store.dispatch(new AddSessionToken(res['updated']));
            }
          });
        return true; // puede entrar
      }
    } else {
      console.log('DEBES INICIAR SESION');
      localStorage.clear();
      return false;
    }
  }

  refreshToken(token_data: string) {
    let refresh_url = this.getUrlProyect() + 'api/v1/api-token-refresh/';
    let datajson = { token: token_data };
    let headers = new Headers();
    return this.http.post(refresh_url, datajson);
  }

  getToken() {
    const token = this.store.selectSnapshot(UserAuthState).token;
    if (token !== 'undefined') {
      return token;
    } else {
      return token;
    }
  }

  logout(){}
  /*
  logout() {
    this.fireAuth.signOut().then(resultado => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
  */

  logoutMultiple() {
    this.logout();
    Swal.fire({
      title: 'Estimado Usuario',
      text: `Alguien mas ha iniciado sesion con su cuenta, recuerde que solo puede conectarse una persona simultaneamente`,
      icon: 'warning',
      allowOutsideClick: false
    }).then(result => {
      // window.location.reload();
    });
  }
}
