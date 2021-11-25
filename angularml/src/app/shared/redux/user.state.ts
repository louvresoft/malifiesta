import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UserInformation } from './user.model';
import { AddUserInformation, RemoveUserInformation } from './user.actions';


@State({
	name: 'UserInformation',
	defaults : null
})

export class UserInformationState {

	@Selector()
	static getUserInformation(state: UserInformation){
		return state.username
	}

	@Action(AddUserInformation)
	add({getState, patchState}: StateContext<UserInformation>, { payload }:AddUserInformation){
		const state = getState();
		patchState({
			...state,
			...payload
		})
	}
}
