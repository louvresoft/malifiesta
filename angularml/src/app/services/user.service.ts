import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

// Redux
import { Store } from '@ngxs/store';
import { UserInformationState } from '../shared/redux/user.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private local: String = environment.urlProyect;
	private userInformationSource = new BehaviorSubject(null);
	public userInformation = this.userInformationSource.asObservable();

	constructor(private http: HttpClient,
				private store: Store) {
	}

	getUrlProyect(){
		return this.local;
	}

	loadUserInformation(){
		return this.http.get(this.getUrlProyect()+'api/v1/users/');
	}

	getUserAvatar(id: number){
		return this.http.get(this.getUrlProyect()+`api/v1/users/avatar/${id}`)
	}

	getUserInformation(){
		//const idusuario = this.store.selectSnapshot(UserInformationState).id;
		//return this.db.doc(`usuarios/${idusuario}`).valueChanges();
	}

	setOrUpdateInformationUser(data:any){
		this.userInformationSource.next(data);
	}

	send_email_reset_pass(data:any){
		console.log('URL A ENVIAR:', data);
		const url: any = this.getUrlProyect() + 'api/v1/users/reset_password/';
		return this.http.post(url, data);
	}

	ckeck_reset_pass(uidb64, tok){
		let url = this.getUrlProyect() + 'api/v1/users/password_reset/'+uidb64 +"/"+tok+"/";
		return this.http.get(url)
	}

	reset_pass(uidb64, tok, data){
		console.log('UID',uidb64);
		console.log('tok', tok);
		let url:any = this.getUrlProyect() + 'api/v1/users/password_reset/'+uidb64 +"/"+tok+"/";
		return this.http.post(url, data)
	}
}
