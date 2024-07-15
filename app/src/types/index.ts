export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;
}

export interface IAd {
  id?: number;
  title: string;
  price?: number;
  currency:string;
  createdAt?: Date;
  location?: string;
  description?: string;
  images?: string[];
  userId: number;
}

export interface IDBResponse<T> {
    data?: T | Array<T>;
    status?: number;
    error?: string;
}

export interface ISQLResponse<T> {
  command: string;
  fields:Array<Record<string,number|string>>;
  rowAsArray: boolean;
  rowCount: number;
  rows: Array<T>;
  viaNeonFetch: boolean;
}
