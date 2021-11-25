import { UserInformation } from './user.model';

export class AddUserInformation {
	static readonly type = '[UserInformationLogin] Add';
	constructor(public payload: UserInformation){
	}
}

export class RemoveUserInformation {
	static readonly type = '[UserInformationLogin] Remove';
	constructor(public payload: string){
	}
}
