import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
// Redux
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private enterpriseSelectedSource = new BehaviorSubject(null);
  private enterprisesUserSource = new BehaviorSubject(null);
  private enterpriseSelectedTriggerSource = new BehaviorSubject(null);
  // private enterprisedoc: AngularFirestoreCollection;
  // public empresas:Observable<any>;
  // private empresa_seleccionada:Observable<any>;
  // public enterprises$ = this.enterpriseSource.asObservable();
  // public enterprises: AngularFirestoreCollection<any[]>;// = this.enterpriseSource.asObservable();
  public enterpriseSelected = this.enterpriseSelectedSource.asObservable();
  public enterpriseSelectedTrigger = this.enterpriseSelectedTriggerSource.asObservable();
  public enterprisesUser = this.enterprisesUserSource.asObservable();

  constructor(
    private _auth: AuthService,
    private http: HttpClient,
    private store: Store
  ) {
  }

  addMember(data: any) {
    // add members to enterprise, send invitation to collborate
    // http://localhost:8000/api/v1/enterprises/:id/members/
    const url =
      this._auth.getUrlProyect() +
      `api/v1/enterprises/${data.enterprise}/members/`;
    return this.http.post(url, data);
  }

  /*
  getEnterpriseInfo(rfc: any) {
    return this.db.doc(`empresas_info/${rfc}`).valueChanges();
  }

  getMembersEnterpriseData(rfc: any) {
    const url =
      this._auth.getUrlProyect() + `api/v1/enterprises/${rfc}/members/`;
    return this.http.get(url);
  }

  getMembersEnterpriseInvitations(rfc: any) {
    return this.db
    .collection('invitaciones/', ref => ref.where('rfc', '==', rfc))
    .valueChanges();
  }

  getMembersEnterprise(rfc: any) {
    return this.db.collection(`empresas_info/${rfc}/miembros`).valueChanges();
  }
  */

  deleteInvitationMember(id: number) {
    const url =
      this._auth.getUrlProyect() + `api/v1/enterprises/invitations/${id}/`;
    return this.http.delete(url);
  }

  getProvidersEnterprise(pk: number) {
    const url =
      this._auth.getUrlProyect() + `api/v1/enterprises/providers/${pk}/`;
    return this.http.get(url);
  }

  uploadProvidersEnterprise(data: any) {
    const url = this._auth.getUrlProyect() + 'api/v1/providers/upload/';
    return this.http.post(url, data);
  }

  getStatsEnterprise(pk: number, tipo: string) {
    const url = this._auth.getUrlProyect() + `api/v1/enterprises/stats/${pk}/`;
    const params = new HttpParams().set('time', tipo);
    return this.http.get(url, { params: params });
  }

  /*
  getEnterprisesOfUser() {
    const id_usuario = this.store.selectSnapshot(UserInformationState).id;
    return this.db
    .collection('miembros_empresas', ref =>
      ref.where('id_usuario', '==', id_usuario)
    )
    .valueChanges();
  }
  */

  createEnterprise(data: any) {
    const url = this._auth.getUrlProyect() + 'api/v1/enterprises/';
    return this.http.post(url, data);
  }

  triggerEnterpriseSelected(data: any) {
    if ( data ) {
      localStorage.setItem('eid', data.rfcEmpresa);
    }
    this.enterpriseSelectedTriggerSource.next(data);
  }

  setEnterpriseSelected(data: any) {
    this.enterpriseSelectedSource.next(data);
  }

  setEnterprisesUser(data: any) {
    this.enterprisesUserSource.next(data);
  }

  getMetadataForMonth(pk: number, fecha: any) {
    const url = this._auth.getUrlProyect() + `api/v1/sat/metadata-month/${pk}`;
    const params = new HttpParams().set('fecha', fecha);
    return this.http.get(url, { params: params });
  }



  getMonthsUnlocked(pk: number, year: any) {
    const url = this._auth.getUrlProyect() + `api/v1/sat/months-unlocked/${pk}`;
    const params = new HttpParams().set('year', year);
    return this.http.get(url, { params: params });
  }


  getMetadataBlacklist(data: any) {
    const url =
      this._auth.getUrlProyect() + 'api/v1/enterprises/metadata-blacklist/';
    return this.http.post(url, data);
  }

  getMetadataForYear(pk: number, fecha: any) {
    const url = this._auth.getUrlProyect() + `api/v1/sat/metadata-year/${pk}`;
    const params = new HttpParams().set('fecha', fecha);
    return this.http.get(url, { params: params });
  }

  canUnblockYear(data: any) {
    const url =
      this._auth.getUrlProyect() + 'api/v1/enterprises/can-unblock-year/';
    return this.http.post(url, data);
  }

  getEnterpriceSelected(data: any) {
    const url = this._auth.getUrlProyect() + `api/v1/enterprises/selected/`;
    return this.http.post(url, data);
  }

  verifyProvider(data: any) {
    const url = this._auth.getUrlProyect() + `api/v1/enterprises/verify-rfc/`;
    return this.http.post(url, data);
  }

  getEnterprisesWithEFOS() {
    const url =
      this._auth.getUrlProyect() + `api/v1/enterprises/enterprisefos/`;
    return this.http.get(url);
  }

  acceptInvitation(invitation_token:any) {
    // accept invitation to colaborate in enterprise, send invitation to collborate
    // http://localhost:8000/api/v1/enterprises/invitations/?token=
    const url =
      this._auth.getUrlProyect() +
      'api/v1/enterprises/invitations/?token=' +
      invitation_token;
    return this.http.get(url);
  }

  deleteMemberEnterprise(pk: number) {
    const url =
      this._auth.getUrlProyect() + `api/v1/enterprises/${pk}/members/`;
    return this.http.delete(url);
  }

  updateFiel(data: any) {
    const url = this._auth.getUrlProyect() + 'api/v1/enterprises/update-fiel/';
    return this.http.post(url, data);
  }

  consultaStatusField(data: any) {
    const url = this._auth.getUrlProyect() + `api/v1/enterprises/consult-fiel/`;
    return this.http.post(url, data);
  }


  getMyId() {
    const url = this._auth.getUrlProyect() + `api/v1/enterprises/myId/`;
    return this.http.get(url);
  }

  updateAlertsFirebase(data: any) {
    const url =
      this._auth.getUrlProyect() + `api/v1/enterprises/update-alerts/`;
    return this.http.post(url, data);
  }

  getProvidersCount(pk: any) {
    const url =
      this._auth.getUrlProyect() + 'api/v1/enterprises/providers-count/';
    return this.http.post(url, pk);
  }

  getProvidersCount69(pk: any) {
    const url =
      this._auth.getUrlProyect() + 'api/v1/enterprises/providers-69count/';
    return this.http.post(url, pk);
  }

  getEfosReport(data: any) {
    const url =
      this._auth.getUrlProyect() + 'api/v1/enterprises/generateReport/';
    return this.http.post(url, data);
  }

  getEfosReport69(data: any) {
    const url =
      this._auth.getUrlProyect() + 'api/v1/enterprises/generateReport69/';
    return this.http.post(url, data);
  }

  getRenovationStatusByEnterprise(rfcEmpresa: string) {
    const url =
      this._auth.getUrlProyect() +
      'api/v1/merchant-1/renovation-by-enterprise/';
    const params = new HttpParams().set('rfcEmpresa', rfcEmpresa);
    return this.http.get(url, { params: params });
  }

  getFeaturesByEnterprise(rfcEmpresa: string) {
    const url = this._auth.getUrlProyect() +
      `api/v1/enterprises/${rfcEmpresa}/features-enabled/`;
    return this.http.get(url);
  }


  getElectroGrafica(data: any){
    const url = this._auth.getUrlProyect() + 'api/v1/enterprises/electrograficas';
    return this.http.post(url, data);
  }
  
}
