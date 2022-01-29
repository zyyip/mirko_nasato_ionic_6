import React, { useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "./firebase";

interface Auth {
    loggedIn: boolean;
    userId? : string;
}

interface AuthInit {
    auth? : Auth;
    loading: boolean;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth{
    return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
    useEffect(()=>{
        // Unsubscribe is the function that want to call if we don't want to receive auth state changes
        // ideally we should return this function from our useEffect callback, this way if react unmounts the component the starter listening tool to auth state changes will auto unsubscribe. 
        // In our case we are using this in the App component which will not be unmounted ever.
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            const auth = firebaseUser ?
            { loggedIn: true, userId: firebaseUser.uid } :
            { loggedIn: false };
            setAuthInit({ auth, loading: false });
        });
    }, []);
    return authInit;
}