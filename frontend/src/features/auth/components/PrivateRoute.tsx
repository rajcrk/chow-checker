import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { verifyJwt } from "../authSlice";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
    
    const { isAuthenticated, isSuccess, jwt } 
        = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!jwt || !jwt?.token) return;

        dispatch(verifyJwt(jwt.token));
    }, [jwt, isSuccess])

    return isAuthenticated ? page : <Navigate replace to='/login' />;
}

export default PrivateRoute;