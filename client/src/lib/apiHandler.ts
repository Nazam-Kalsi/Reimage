import axios, { isAxiosError, Method } from "axios"

export const apiHandler = async (url: string,method:string, config={}) => {
    try {
        const res = await axios({
            method:method.toUpperCase() as Method,
            url:`${import.meta.env.VITE_API_URL}${url}`,
            withCredentials: true,
            ...config
        });
        return {success:true,res};
    } catch (error) {
        const axiosErr = isAxiosError(error);
        if(axiosErr){
            console.log(error);
            return {success:false,message:error.response?.data.message};
        }
        else{
            return {success:false,message:(error as Error).message};
        }
    }
}