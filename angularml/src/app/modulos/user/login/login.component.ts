import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { SuscriptionService } from '../../../services/suscription.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';
declare function init_plugins();

// Redux
import { Store } from '@ngxs/store';
import { UserInformationState } from '../../../shared/redux/user.state';
import { UserAuthState } from '../../../shared/redux/auth.state';
import { AddUserInformation } from '../../../shared/redux/user.actions';
import { AddToken, AddSessionToken, AddFirebaseToken, Logout } from '../../../shared/redux/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    // Variables
    public showReset:Boolean = false;
    public restablecer:Boolean = false;
    public formulario = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    public formularioReset = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    });

    // Control
    public submited:boolean = false;
    public navigation_id:any;
    private suscripcionFirebaseInfo:any;
    private toShow:boolean = false;

    constructor(private _authService: AuthService,
                private _userService: UserService,
                private route: ActivatedRoute,
                private ngZone: NgZone,
                private router: Router,
                private store: Store){
        // if (this.store.selectSnapshot(UserAuthState).token) {
        this.store.dispatch(new Logout());
        // }
        this.route.params.subscribe(params => {
            if(params['slug']){
                this.navigation_id = params['slug'];
            }else{
                this.navigation_id = -1;
                this.ngZone.run(()=>{
                    this.router.navigate(['/login']);
                })
            }
        });
    }

    ngOnInit() { // carga los plugins de login
      init_plugins();
    }

    ngOnDestroy(){
        if (this.suscripcionFirebaseInfo) {
            this.suscripcionFirebaseInfo.unsubscribe();
        }
    }

    loginEfos()  {
        this.ngZone.run(()=>{});
        console.log(this.formulario.valid);
        this.submited = true;
        if (this.formulario.valid) {
          Swal.fire({
                title: 'Un momento',
                text: 'Estamos validando sus credenciales',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            this._authService.loginService(this.formulario.value).subscribe(
            (res: any) => {
                console.log(res);
                this.store.dispatch(new AddToken(res['token']));
                this.store.dispatch(new AddFirebaseToken(res['firebase']));
                this.store.dispatch(new AddUserInformation(res['user']));
                this.fireAuth.signInWithCustomToken(res['firebase'])
                .then(res => {
                    this.router.navigate(['/dashboard']);
                    Swal.close();
                }).catch( error =>{
                    console.log('SHOULD ENTRY: ',error);
                    Swal.fire('Lo sentimos', 'Sus credenciales son incorrectas', 'error');
                });
            }, error => {
                this.restablecer = true;
                if ('non_field_errors' in error.error) {
                    if (error.error["non_field_errors"].length > 0) {
                        Swal.fire('Oops...', error.error['non_field_errors'][0], 'error');
                    }
                }
            }
            );
        }
    }

    irRegistro(){
        this.ngZone.run(()=>this.router.navigateByUrl('/register/' + this.navigation_id));
    }

    mostrarMenuReset(){
      this.restablecer = false;
      this.showReset = (this.showReset === true?false: true);
    }

    enviarEmailReset(){
      console.log('SEND EMAIL', this.formularioReset.value);
      this._userService.send_email_reset_pass(this.formularioReset.value).subscribe(
        res =>{ console.log(res)
          Swal.fire("!Enviadó!", "verifique su correo electrónico", "success")
        },
        error =>{console.log(error.error);
          Swal.fire('Lo sentimos', error.error['detail'], "error");
        });

    }

  mostrarPassword(){
    this.toShow = (this.toShow === true ? false: true);
    var eye = document.getElementById('etiqueta-ojo');
    var entrada = (<HTMLInputElement>document.getElementById('passwordinput'));
    if(this.toShow == true){
/*       eye.classList.remove('fa-eye-slash');
      eye.classList.add('fa-eye');
      entrada.type = 'text'; */
    }else{
/*       eye.classList.remove('fa-eye');
      eye.classList.add('fa-eye-slash');
      entrada.type = 'password'; */
    }
  }
}
