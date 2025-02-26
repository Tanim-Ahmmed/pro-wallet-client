import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTransactions = () => {
    const axiosPublic = useAxiosPublic();
    const {data : transactions =[], refetch } = useQuery({
        queryKey:['transactions'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/transection')
            return res.data;
        }
    })
    return [transactions, refetch]
};
export default useTransactions;