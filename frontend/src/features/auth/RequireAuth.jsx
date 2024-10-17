import { useLocation, Navigate, useFetcher } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Layout from "../../LayOut";
import { selectCurrentToken } from "./AuthSLice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const [isAuth, setIsAuth] = useState(!!token); 
    const [isLoading, setIsLoading] = useState(true);

    console.log(token ,"token require auth");
    
  useEffect(()=>{
    const timer = setTimeout(()=>{
        if(token){
            setIsAuth(false);
        }else{
            setIsAuth(true);
        }
        setIsLoading(false);
    },100)
    return () => clearTimeout(timer);
  },[token])

  if (isLoading) {
    return <div>Loading...</div>; 
  }

    return (
        token ? (
            <Layout/>
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
};

export default RequireAuth;
