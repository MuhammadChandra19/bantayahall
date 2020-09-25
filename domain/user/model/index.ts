
export interface UserBaseModel {
  id?: any;
  username?: string;
}

export interface UserRegister {
  username: string;
  password: string;
  email: string;
}
export interface UserModel extends UserBaseModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  imageUrl: string;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
}

export interface LoginModel {
  username: string;
  password: string;
  rememberMe: boolean;
}