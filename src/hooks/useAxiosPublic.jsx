import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://y-beryl-delta-46.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;