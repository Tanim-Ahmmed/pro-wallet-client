import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useCurrentUser = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const {data : currentUser =[], refetch } = useQuery({
        queryKey:['currentUser', user?.email],
        enabled: !!user?.email, 
        queryFn: async () =>{
            const res = await axiosPublic.get(`/users/email/${user.email}`)
            return res.data;
        }
    })

    return [currentUser, refetch]
};

export default useCurrentUser;