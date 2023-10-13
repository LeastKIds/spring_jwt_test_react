import React, {FC, useEffect, useState} from "react";
import {AuthGuard} from "../../type/interface/auth/AuthGuard";
import {PathEnum} from "../../type/enum/path/PathEnum";
import ProgressbarView from "../progressbar/ProgressbarView";
import SignInView from "./signIn/SignInView";



const Auth:FC<AuthGuard> = ({path, children}) => {
    const [isAuthLoading, setAuthIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        setAuthIsLoading(true);
        setTimeout(() => {
            setIsAuthenticated(false);
            setAuthIsLoading(false);
            console.log(path)
        }, 2000);

    }, []);

    if(isAuthLoading)
        return <ProgressbarView />
    else if((!isAuthLoading && isAuthenticated))
        return (
            <>{children}</> // 만약 useContext가 쓸일이 있으면 여기에...
        )
    else
        return <SignInView />

}

export default Auth;