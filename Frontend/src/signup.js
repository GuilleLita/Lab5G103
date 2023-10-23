import React, { useState } from "react";

import { useNavigate } from "react-router-dom";


const SignUp = (props) => {

    const [email, setEmail] = useState("")

    const [firstName, setName] = useState("")

    const [lastName, setLastName] = useState("")

    const [password, setPassword] = useState("")

    const [role, setRole] = useState("")

    const [emailError, setEmailError] = useState("")

    const [passwordError, setPasswordError] = useState("")

    

    const navigate = useNavigate();

        

    const onButtonClick = () => {

        
        // Set initial error values to empty

        setEmailError("")

        setPasswordError("")


        // Check if the user has entered both fields correctly

        if ("" === email) {

            setEmailError("Please enter your email")

            return

        }


        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {

            setEmailError("Please enter a valid email")

            return

        }


        if ("" === password) {

            setPasswordError("Please enter a password")

            return

        }


        if (password.length < 7) {

            setPasswordError("The password must be 8 characters or longer")

            return

        }


        SignUp()
        

    }

    // Call the server API to check if the given email ID already exists

    const checkAccountExists = (callback) => {

        fetch("http://localhost:4000/check-account", {

            method: "POST",

            headers: {

                'Content-Type': 'application/json'

              },

            body: JSON.stringify({email})

        })

        .then(r => r.json())

        .then(r => {

            callback(r?.userExists)

        })

    }


    // Log in a user using email and password

    const SignUp = () => {

        fetch("http://localhost:4000/api/roles/", {

            method: "POST",

            headers: {

                'Content-Type': 'application/json'

              },

            body: JSON.stringify({name:"user"})

        })

        fetch("http://localhost:4000/api/auth/signup", {

            method: "POST",

            headers: {

                'Content-Type': 'application/json'

              },

            body: JSON.stringify({firstName, lastName, email, password, role})

        })

        .then(res => res.json())

        .then(res => {

            if ('success' === res.message) {

                localStorage.setItem("user", JSON.stringify({email, token: res.token}))

                props.setLoggedIn(true)

                props.setEmail(email)

                navigate("/")

            } else {

                window.alert(res.errors.message)

            }

        })

    }


    return <div className={"mainContainer"}>

        <div className={"titleContainer"}>

            <div>Login</div>

        </div>

        <br />

        <div className={"inputContainer"}>

            <input

                value={email}

                placeholder="Enter your email here"

                onChange={ev => setEmail(ev.target.value)}

                className={"inputBox"} />

            <label className="errorLabel">{emailError}</label>

        </div>

        <br />

        <div className={"inputContainer"}>

            <input

                value={password}

                placeholder="Enter your password here"

                onChange={ev => setPassword(ev.target.value)}

                className={"inputBox"} />

            <label className="errorLabel">{passwordError}</label>

        </div>

        <div className={"inputContainer"}>

            <input

                value={firstName}

                placeholder="Enter name here"

                onChange={ev => setName(ev.target.value)}

                className={"inputBox"} />

            

        </div>

        <div className={"inputContainer"}>

            <input

                value={lastName}

                placeholder="Enter last name here"

                onChange={ev => setLastName(ev.target.value)}

                className={"inputBox"} />   

            

        </div>

        <div className={"inputContainer"}>

            <input

                value={role}

                placeholder="Enter role here"

                onChange={ev => setRole(ev.target.value)}

                className={"inputBox"} />

            

        </div>


        <br />

        <div className={"inputContainer"}>

            <input

                className={"inputButton"}

                type="button"

                onClick={onButtonClick}

                value={"Sign Up"} />

        </div>

    </div>

}


export default SignUp