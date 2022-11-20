interface IUserRequest {
    firstName: string,
    lastName: string,
    status: string,
    email:string,
}

interface IUser extends IUserRequest{
    SID: string,
    createdAt: Date,
}

interface IUserId{
    SID:string,
}


interface IUserStatus extends IUserId{
    status:string,
}

export {IUserRequest, IUser, IUserId , IUserStatus,}