import React from 'react'
import './singleUserTab.css'
import { IUser } from '../../../interfaces/User'
import { Checkbox } from '@material-ui/core'
import edit_black_24dp from '../../../assets/edit_black_24dp.svg'
import { Link } from 'react-router-dom'
import { setEditedUser, setMarkedUsers } from '../../../redux/usersSlice'
import { useAppDispatch, useAppSelector} from "../../../redux/store";

interface IUserAsProps {
    user : IUser
}


const statusNames = ["",'active','invited','diabled']
const statusColor = ["",'green','blue','gray']


 //need to make sure it is compiling on chaje

const SingleUserTab : React.FC<IUserAsProps> = (props) => {
    
    const dispach = useAppDispatch()
    const handleEditIconClick = (user:IUser) => {
        dispach(setEditedUser(user)) // transfer the data of the user we want to edit to the form component
        dispach(setMarkedUsers([])) // claer the marked users
    }
    const markedUsers = useAppSelector(state => state.user.markedUsers)
    
    const handleCheckBox = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        e.target.checked ?  dispach(setMarkedUsers([...markedUsers, {SID:props.user.SID}])) : dispach(setMarkedUsers(markedUsers.filter(user => user.SID!=props.user.SID)))
    }

    
    return (
        <div className="SingleUserTab" >
            <div className="leftInbox" ><Checkbox onChange={(e)=>{handleCheckBox(e)}}/></div>
            <p className="username">{props.user.firstName} {props.user.lastName}</p>
            <span ></span>
            <p className="statusText" style={{color:statusColor[(props.user.status)]}}>{statusNames[(props.user.status)]}</p>
            <Link to="/user_form" onClick = {(e)=> handleEditIconClick(props.user)}>
                <img className="clickableIcon" src={edit_black_24dp}></img>
            </Link>
        </div>
    )
}


export default SingleUserTab
