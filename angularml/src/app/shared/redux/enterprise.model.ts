export interface EnterpriseMemberInfo {
    activo: boolean;
    id_miembro: number;
    id_usuario: number;
    propietario: boolean;
    rfcEmpresa: string;
  }
  
  export interface EnterpriseSelected extends EnterpriseMemberInfo {}
  
  export interface EnterprisesUser {
    enterprises: EnterpriseMemberInfo[];
  }
  