import React from "react"

import { useNavigate } from "react-router-dom";


const Home = (props) => {

    const { loggedIn, email } = props

    const navigate = useNavigate();

    

    const onButtonClick = () => {

        var floorsArray = ["a","b"];


        fetch("http://localhost:4000/api/building/create", {

            method: "POST",

            headers: {

                'Content-Type': 'application/json'

              },

            body: JSON.stringify({
                buildingId: "1",
                buildingName: "test",
                description: "testdesc",
                height: 1,
                width: 2,
                numOfFloors: 3,
                floors: floorsArray,
                elevatorFloors: floorsArray

                
            })

        })


        /*if (loggedIn) {

            localStorage.removeItem("user")

            props.setLoggedIn(false)

        } else {

            navigate("/login")

        }*/

    }


    return <div className="mainContainer">

        <div className={"titleContainer"}>

            <div>Welcome!</div>

        </div>

        <div>

            This is the home page.

        </div>

        <div className={"buttonContainer"}>

            <input

                className={"inputButton"}

                type="button"

                onClick={onButtonClick}

                value="Crear Edificio TEST" />

            {(loggedIn ? <div>

                Your email address is {email}

            </div> : <div/>)}

        </div>



    </div>

}


export default Home