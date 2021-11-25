import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EnterpriseService } from './enterprise.service';
import { BehaviorSubject } from 'rxjs';

// Redux
import { Store } from '@ngxs/store';
import { UserInformationState } from '../shared/redux/user.state';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {
  private userSubscriptionSource = new BehaviorSubject(null);
  public userSubscription = this.userSubscriptionSource.asObservable();

  constructor(
    private _auth: AuthService,
    private enterpriseService: EnterpriseService,
    private http: HttpClient,
    private store: Store
  ) {}

  loadSubscription() {
    return this.http.get(
      this._auth.getUrlProyect() + 'api/v1/merchant-1/subscriptions/'
    );
  }

  getRenovationConfigByUser() {
    return this.http.get(
      this._auth.getUrlProyect() + 'api/v1/merchant-1/renovation-config/'
    );
  }

  setOrUpdateSubscription(data: any) {
    this.userSubscriptionSource.next(data);
  }

  /*
  getInfoSubscription(id: any) {
    let idsuscripcion = id;
    return this.db.doc(`suscripciones/${idsuscripcion}`).valueChanges();
  }

  getSubscriptionUser() {
    // console.log('ejecutado')
    const idusuario = this.store.selectSnapshot(UserInformationState).id;
    return this.db
      .collection('suscripciones', ref => ref.where('usuario', '==', idusuario))
      .valueChanges();
  }
  */
}
