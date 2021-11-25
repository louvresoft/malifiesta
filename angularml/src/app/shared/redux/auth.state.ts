import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UserAuth } from './user.model';
import { AddToken, RemoveToken, AddFirebaseToken, 
		RemoveFirebaseToken, AddSessionToken, 
		RemoveSessionToken, Logout } from './auth.actions';


@State<UserAuth>({
	name: 'Auth',
	defaults : {
		token: null,
		session: null,
	}
})

export class UserAuthState {

	@Action(AddToken)
	addtoken({getState, patchState}: StateContext<UserAuth>, { payload }:AddToken){
		const state = getState();
		patchState({
			...state,
			token: payload
		})
	}

	@Action(AddFirebaseToken)
	addfirebase({getState, patchState}: StateContext<UserAuth>, { payload }:AddFirebaseToken){
		const state = getState();
		patchState({
			...state,
			firebase: payload
		})
	}

	@Action(AddSessionToken)
	addsession({getState, patchState}: StateContext<UserAuth>, { payload }:AddSessionToken){
		const state = getState();
		patchState({
			...state,
			session: payload
		})
	}

	@Action(RemoveToken)
	removetoken({getState, patchState}: StateContext<UserAuth>, { payload }:RemoveToken){
		const state = getState();
		patchState({
			...state,
			token: null
		})
	}

	/*@Action(RemoveFirebaseToken)
	removefirebase({getState, patchState}: StateContext<UserAuth>, { payload }:RemoveFirebaseToken){
		const state = getState();
		patchState({
			...state,
			firebase: null
		})
	}*/

	@Action(RemoveSessionToken)
	removesession({getState, patchState}: StateContext<UserAuth>, { payload }:RemoveSessionToken){
		const state = getState();
		patchState({
			...state,
			session: null
		})
	}

	@Action(Logout)
	logout({getState, patchState}: StateContext<UserAuth>){

	}
}
