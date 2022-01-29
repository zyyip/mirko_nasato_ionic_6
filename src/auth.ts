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
        //Unsubscribe is the function that want to call if we don't want to receive auth state changes
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            const auth = firebaseUser ?
            { loggedIn: true, userId: firebaseUser.uid } :
            { loggedIn: false };
            setAuthInit({ auth, loading: false });
        });
    }, []);
    return authInit;
}