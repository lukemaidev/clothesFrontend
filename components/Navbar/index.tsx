"use client"

import Link from "next/link";

import { useAppContext } from "@/context/AppContext";
import { Button, FormControl, Input, InputLabel, TextField, useFormControl } from "@mui/material";
import { useState } from "react";
import axios from "axios";


export default function Navbar() {
    

    const { userName, theme, setUsername, toggleTheme, userinfo, setUserinfo } = useAppContext();
    const [logInUsername, setLogInUsername] = useState('');
    const [logInPassword, setLogInPassword] = useState('');


    const handleLogIn = (e: any) => {
        e.preventDefault();
        console.log(logInUsername, logInPassword);
        axios.post('http://localhost:5000/api/v1/login', { username: logInUsername, password: logInPassword }).then((res: any) => {
            //This step is to mimic getting the jwt token from the server and storing it in the browser
            
            axios.get('http://localhost:5000/api/v1/user/username/' + logInUsername, { withCredentials: true }).then((res: any) => {
                setUsername(res.data.user.username);
                setUserinfo(res.data.user);
                console.log(userinfo.userType)
            }).catch((err: any) => {
                console.log(err);
            })
        }).catch((err: any) => {
            console.log(err);
        })
    }

    const handleLogOut = () => {
        setUsername('');
        setUserinfo({});
    }


    

    const loggedInNavBar = () => {
        return (
            <div>

                Welcome, {userName}

                <Button onClick={handleLogOut}>Click here to log out</Button>
            </div>
        )
    }

    const loggedOutNavBar = () => {
        return (
            <div>

                Hi, please log in and stuff
                <form onSubmit={handleLogIn}>
                    <FormControl>
                        <TextField id="standard-basic" value={logInUsername} onInput={(e: any) => setLogInUsername(e.target.value)} label="Username" variant="standard" />
                        <TextField id="standard-basic" value={logInPassword} onInput={(e: any) => setLogInPassword(e.target.value)} label="Password" variant="standard" type="password" />
                        <Button type="submit">Log In</Button>
                    </FormControl>
                </form>
            </div>
        )
    }

    return (
        <div>
            {userName ? loggedInNavBar() : loggedOutNavBar()}
        </div>
    );
}