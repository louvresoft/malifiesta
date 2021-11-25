import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  EnterpriseMemberInfo,
  EnterprisesUser,
  EnterpriseSelected
} from './enterprise.model';
import {
  SetEnterprisesUser,
  SetEnterpriseSelected
} from './enterprise.actions';
import { AddSubscription } from './subscription.actions';
import {
  map,
  catchError,
  mergeMap,
  concatMap,
  takeUntil,
  take,
  tap
} from 'rxjs/operators';
import { EnterpriseService } from '../../services/enterprise.service';
import { SuscriptionService } from '../../services/suscription.service';

@State({
  name: 'EnterprisesUser',
  defaults: null
})
export class EnterprisesUserState {
  @Action(SetEnterprisesUser)
  setEnterprisesUser(
    { getState, patchState }: StateContext<EnterprisesUser>,
    { payload }: SetEnterprisesUser
  ) {
    const state = getState();
    patchState(payload);
  }
}

@State({
  name: 'EntepriseSelected',
  defaults: null
})
export class EnterprisesSelectedState {
  constructor(
    private enterpriseService: EnterpriseService,
    private suscriptionService: SuscriptionService
  ) {}

  @Action(SetEnterpriseSelected)
  selectEnterprise(
    { getState, patchState, dispatch }: StateContext<EnterpriseSelected>,
    { payload }: SetEnterpriseSelected
  ) {
    if (payload.propietario) {
      return this.enterpriseService
        .getEnterpriseInfo(payload['rfcEmpresa'])
        .pipe(
          take(1),
          concatMap(empresa_info => {
            const state = getState();
            return this.enterpriseService
              .getRenovationStatusByEnterprise(payload['rfcEmpresa'])
              .pipe(
                concatMap(renovation_info => {
                  const temporal: any = {
                    info: empresa_info,
                    renovation_info: renovation_info
                  };
                  patchState({
                    ...state,
                    ...payload,
                    ...temporal
                  });
                  return this.suscriptionService
                    .getInfoSubscription(temporal['info']['suscripcion'])
                    .pipe(
                      take(1),
                      tap((suscripcion_info: any) => {
                        dispatch(new AddSubscription(suscripcion_info));
                      })
                    );
                })
              );
          })
        );
    } else {
      return this.enterpriseService
        .getEnterpriseInfo(payload['rfcEmpresa'])
        .pipe(
          take(1),
          concatMap(empresa_info => {
            const state = getState();
            return this.enterpriseService
              .getRenovationStatusByEnterprise(payload['rfcEmpresa'])
              .pipe(
                tap(renovation_info => {
                  const temporal: any = {
                    info: empresa_info,
                    renovation_info: renovation_info
                  };
                  patchState({
                    ...state,
                    ...payload,
                    ...temporal
                  });
                })
              );
          })
        );
    }
  }
}
