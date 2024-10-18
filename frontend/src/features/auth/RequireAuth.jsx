import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Layout from "../../Layout";
import { selectCurrentRole, selectCurrentToken } from "./AuthSLice";
import { toast } from "react-toastify";

const RequireAuth = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const role = useSelector(selectCurrentRole);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(role)) {
        toast.error("Your are authorized to the route")
        return <Navigate to="/home" replace />;
    }

    return (
       <Layout/>
    );
};

export default RequireAuth;
