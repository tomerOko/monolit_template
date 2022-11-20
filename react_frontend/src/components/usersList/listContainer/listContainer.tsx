import React, { useEffect } from "react";
import './listContainer.css'
import axios, { AxiosResponse } from 'axios'
import {IUser} from '../../../interfaces/User'
import SingleUserTab from "../singleUserTab/singleUserTab";
import { Button } from "@material-ui/core";
import {Link} from 'react-router-dom'
import { setUsers, setMarkedUsers, setEditedUser } from '../../../redux/usersSlice'
import { useAppDispatch, useAppSelector} from "../../../redux/store";

const ListContainer : React.FC = (props) => {

  const dispach = useAppDispatch()
  const users = useAppSelector(state => state.user.users)
  const markedUsers = useAppSelector(state => state.user.markedUsers)
  useEffect(() => {
    setTimeout(() => {getAllUsersFromDb()}, 0);
    }, []
  );

  const getAllUsersFromDb = () => {
    axios.get<IUser[]>('http://localhost:3000/users/getAllUsers')
      .then((response: AxiosResponse) => {
        dispach(setUsers(response.data));
      }
    );
  }
  
  const deleteAllSelected = () => {
    console.log({usersToDelete:markedUsers})
    axios.delete('http://localhost:3000/users/deleteUsersById',{data:{usersToDelete:markedUsers}}) 
      .then((response: AxiosResponse) => {
        dispach(setEditedUser(null))
        console.log(response.data);
        getAllUsersFromDb()
      });
  }

  return (
    <div className='ListContainer'> 
      {
        users?.map(singleUserData => <SingleUserTab user={singleUserData}/>)
      } 
      <div className="buttonsToTheLeft">
        <Button variant="contained" onClick={() => deleteAllSelected()} className="positionButtons" color="primary">
          Delete
        </Button>
        <Button component={Link} to="/user_form" variant="contained" color="primary" className="positionButtons" onClick={()=>{dispach(setMarkedUsers([])); dispach(setEditedUser(null))}}>
          Add User
        </Button>        
      </div>

    </div>
  );
}

export default ListContainer

// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";