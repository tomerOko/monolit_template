import React, {useState} from "react";
import { Fragment } from "react";

//logic can be here
const someFunction = () =>{
    console.log("hallow world")
}

interface ImyData{
    name:string,
    age: number,
}

const MyComponent = (props:any) => {

    //hooks here
    const [myData, setMyData] = useState<ImyData>({name:"", age : 10})

    //life cycle hooks here


    //logic can also be here
    const setName = (name:string) => {
        setMyData({name:name, age:myData.age})
    }

    const setAge = (age:string) => {
        const ageAsNumebr = Number(age)
        ageAsNumebr?setMyData({name:myData.name, age:ageAsNumebr}):console.log("cant cange age, input wasent a number")
    }
    
    //the final tsx component here
    return(
        <Fragment>
            the dude names {myData.name} hes {myData.age} years old
            <input type="text" onChange={ e => setName(e.target.value)}></input>
            <input type="number" onChange={ e => setAge(e.target.value)}></input>
        </Fragment>
    )
}

export default MyComponent
