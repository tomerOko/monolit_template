export interface IUserRequest {
    firstName: string,
    lastName: string,
    status: number,
    email:string,
}

export interface IUser extends IUserRequest{
    SID: string,
}

export interface IUserId{
    SID:string,
}

export interface IUserStatus extends IUserId{
    status:string,
}

