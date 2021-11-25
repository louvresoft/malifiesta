import {
    EnterprisesUser,
    EnterpriseMemberInfo,
    EnterpriseSelected
  } from './enterprise.model';
  
  export class SetEnterprisesUser {
    static readonly type = '[EnterprisesUser] Set';
    constructor(public payload: EnterprisesUser) {}
  }
  
  export class AddEnterpriseUser {
    static readonly type = '[EnterprisesUser] Add';
    constructor(public payload: EnterpriseMemberInfo) {}
  }
  
  export class RemoveEnterpriseUser {
    static readonly type = '[EnterprisesUser] Remove';
    public payload: any;
  }
  
  export class SetEnterpriseSelected {
    static readonly type = '[EnterpriseSelected] Set';
    constructor(public payload: EnterpriseSelected) {}
  }
  