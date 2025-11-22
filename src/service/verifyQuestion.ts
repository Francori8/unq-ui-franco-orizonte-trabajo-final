import axios from "axios";
import { BASE_URL } from "../utils/const";

export const verifyQuestion = async (questionId: string, option: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/answer`, 
            { questionId, option});    
        return response.data;    
    } catch (error) {
        console.log(error);
    }
}   