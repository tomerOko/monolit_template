import { useState, useEffect, Fragment } from "react";

interface IUserFormProps{

}

const UserForm = (props:IUserFormProps) => {

    const [data , setData] = useState<any>(0)

    useEffect(() => {
        console.log("UserForm pre-render")
        return () => {
            console.log("UserForm post-render")
        }
    }, [])

    return (
        <Fragment>
            <button></button>
        </Fragment>
    )
}

export default UserForm