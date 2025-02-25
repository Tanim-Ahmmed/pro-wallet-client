import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Pages/shared/Loading";
import useAgent from "../hooks/useAgent";


const AgentRoute = ({children}) => {
    const {user, loading } = useAuth();
    const [isAgent, isAgentLoading]= useAgent();
    if(loading || isAgentLoading){
        return <Loading></Loading>
    }
    if(user && isAgent){
        return children;
    }
    return  <Navigate to="/login" state={location?.pathname}> </Navigate>
};

export default AgentRoute;