import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect, Fragment, ChangeEvent } from "react";
import {Link} from 'react-router-dom'
import { IUser, IUserId, IUserRequest } from '../../interfaces/User'
import { useAppDispatch, useAppSelector} from "../../redux/store";
import { setEditedUser, setUsers } from '../../redux/usersSlice' 
import './FormComponent.css'

//TODO
//add a refresh mecanism in order to make 
type IUserFormProps = Partial<IUser>

const FormComponent: React.FC<IUserFormProps> = (props) => {

    const editedUser = useAppSelector(state => state.user.editedUser) //the user b
    const dispach = useAppDispatch() 

    let currentState: IUserFormProps= editedUser? Object.assign({},editedUser) : {}
    const handleSubmint = () => {
        editedUser == null ? createNewUser() : updateUser() ;
    }

    const createNewUser = () => {
        axios.post<IUserId>('http://localhost:3000/users/createUser', currentState )
        .then((response: AxiosResponse) => {
          dispach(setEditedUser(null))
          axios.get<IUser[]>('http://localhost:3000/users/getAllUsers')
          .then((response: AxiosResponse) => {
            dispach(setUsers(response.data));
          }
        );
        });    
    }

    const updateUser = () => {
        axios.post<IUserId>('http://localhost:3000/users/setUserStatus', currentState )
        .then((response: AxiosResponse) => {
          dispach(setEditedUser(null));
          axios.get<IUser[]>('http://localhost:3000/users/getAllUsers')
          .then((response: AxiosResponse) => {
            dispach(setUsers(response.data));
          })
        }); 
    }


    return (
        <Fragment>
            
            <div className="twoColumnsGrid">
                
                <div id="leftSide">
            
                    <div className="singleInputContainer">
                        <label className="putLableAbove">First Name</label>
                        <TextField disabled={editedUser !==null} onChange={(e)=>{currentState.firstName=e.target.value}}
                        defaultValue={currentState?.firstName} placeholder="Enter First Name" variant="standard" InputProps={{disableUnderline: true }}/>
                    </div> 
                   
                    <div className="singleInputContainer">
                        <label className="putLableAbove">Last Name</label>
                        <TextField disabled={editedUser !==null} onChange={(e)=>{currentState.lastName=e.target.value}}
                        defaultValue={currentState?.lastName} placeholder="Enter Last Name" variant="standard" InputProps={{disableUnderline: true }}/>
                    </div>

                    <div className="singleInputContainer">                    
                        <label className="putLableAbove">Email</label>
                        <TextField disabled={editedUser !==null} onChange={(e)=>{currentState.email=e.target.value}}
                        defaultValue={currentState?.email} placeholder="Enter Email" variant="standard" InputProps={{disableUnderline: true }}/>
                    </div>

                    <div className="singleInputContainer">
                        <label className="putLableAbove">Status</label>
                        <Select onChange={(e)=>{currentState.status= (e.target.value as number)}}
                            labelId="statusInputLable" id="status" defaultValue={currentState?.status}
                            label="status" variant="standard" inputProps={{disableUnderline: true }}>
                            <MenuItem value={1}>acitve</MenuItem>
                            <MenuItem value={2}>invited</MenuItem>
                            <MenuItem value={3}>disabled</MenuItem>
                        </Select>
                    </div>

                </div>

                <div id="rightSide">
                    <Button component={Link} to="/" onClick={()=> handleSubmint()} variant="contained"
                    color="primary" className="positionButtons" style={{textDecoration:"underline"}}>
                    {editedUser == null ? "add user" : "update user"}</Button>
                </div>
            </div>
        </Fragment>
    )
}

export default FormComponent


    // const [data , setData] = useState<any>(0)
   
