import { UserAuth } from './user.model';

// Electroefos
export class AddToken {
	static readonly type = '[AuthToken] Add';
	constructor(public payload: string){
	}
}

export class RemoveToken{
	static readonly type = '[AuthToken] Remove';
	public payload:any;
}

// Firebase
export class AddFirebaseToken {
	static readonly type = '[AuthFirebaseToken] Add';
	constructor(public payload: string){
	}
}

export class RemoveFirebaseToken {
	static readonly type = '[AuthFirebaseToken] Remove';
	public payload:any;
}

// Sesion
export class AddSessionToken {
	static readonly type = '[AuthSessionToken] Add';
	constructor(public payload: string){
	}
}

export class RemoveSessionToken {
	static readonly type = '[AuthSessionToken] Remove';
	public payload:any;
}


// Logout
export class Logout {
	static readonly type = '[Logout] OK';
}
