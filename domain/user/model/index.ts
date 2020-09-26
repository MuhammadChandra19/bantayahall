
export interface UserBaseModel {
  id?: any;
  username?: string;

}

export interface UserRegister {
  username: string;
  password: string;
  email: string;
}

export interface UserMainModel extends UserBaseModel {
  email?: string,
  firstName?: string,
  langKey?: string,
  lastName?: string,
  address?: string,
  postalCode?: string,
  phone?: string,
}
export interface UserModel extends UserMainModel {
  activated?: boolean,
  authorities?: string[],
  createdBy?: string;
  createdDate?: Date;
  login?: string,
  imageUrl?: string
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
}

export interface LoginModel {
  username: string;
  password: string;
  rememberMe: boolean;
}