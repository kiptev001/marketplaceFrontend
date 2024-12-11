export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IUser {
    email: string;
    isActivated: boolean;
    id: number | string;
}

export interface IUserFromDb {
    id:number;
    email:string;
    password:string;
    isactivated:boolean;
    activationlink:string;
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
