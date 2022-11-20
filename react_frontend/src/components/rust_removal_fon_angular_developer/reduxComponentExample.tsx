import { Fragment } from "react";
import { IUser } from "../../interfaces/User";
import { useAppDispatch, useAppSelector} from "../../redux/store";
import { setUsers } from '../../redux/usersSlice' 

const ReduxComponent = (props:any) => {

    const users = useAppSelector(state => state.user.users)
    const dispach = useAppDispatch()

    const newState:IUser[] = []

    return (
        <Fragment>
            <button onClick={()=>{dispach(setUsers(newState))}}></button>
            <p>{users[0]?.SID}</p>
        </Fragment>
    )
}

export default ReduxComponent

// import { IUser } from "../../interfaces/User";
// import { useAppDispatch, useAppSelector} from "../../redux/store";
// import { setUsers } from '../../redux/usersSlice' 
//////////////////////////////////////////////////////////////
// const users = useAppSelector(state => state.user.users)
// const dispach = useAppDispatch()
// const newState:IUser[] = []
//////////////////////////////////////////////////////////////
// <button onClick={()=>{dispach(setUsers(newState))}}></button>
// <p>{users[0]?.SID}</p>