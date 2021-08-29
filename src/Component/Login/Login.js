import React, { useContext } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, Typography } from '@material-ui/core';
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
const Login = () => {
    const [userDataInfo, setUserDataInfo] = useContext(UserContext)
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                // console.log(token)
                const user = result.user;
                // ...
                const { displayName, email, photoURL } = user
                const newUserData = { ...userDataInfo }
                newUserData.isSignedIn = true
                newUserData.name = displayName
                newUserData.email = email
                newUserData.photoURL = photoURL
                setUserDataInfo(newUserData)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential)
            });
    }
    return (
        <div 
            className="login__body">
            <Typography variant="h6" component="p">Chat To Login First</Typography><br />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default Login;