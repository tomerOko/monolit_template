import {createSlice , PayloadAction} from '@reduxjs/toolkit'
import { IUser, IUserId } from '../interfaces/User'

export interface IUserState {
    
    /**
     * all the users we are currently have in the app memory, shuld allways be eaqual to the state in DB
     */
    users : IUser[],
    /**
     * the user currently being eddited, will be 'null' if the userForm is used for new user creation
     */
    editedUser : IUser | null,
    /**
     * what users are selected in any screen
     */
    markedUsers : IUserId[]

}

const initialState : IUserState = {
    editedUser : null,
    users : [],
    markedUsers: []
}

const usersSlice = createSlice({
    name : "users",
    initialState,
    reducers: {
        setEditedUser: (state, action : PayloadAction<IUser|null>) =>{
            state.editedUser = action.payload
        },
        clearEdited: (state) => {
            state.editedUser=null
        },
        setUsers : (state, action : PayloadAction<IUser[]>) =>{
            state.users = action.payload
        },
        setMarkedUsers : (state, action : PayloadAction<IUserId[]>) =>{
            state.markedUsers = action.payload
        }
    }
})

export const {clearEdited, setEditedUser, setUsers, setMarkedUsers} = usersSlice.actions
export {usersSlice}