import axios from "axios";
import { BASE_URL } from "../utils/const";

export const getDificulty = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/difficulty`);    
        return response.data;    
    } catch (error) {
        throw error;
    }
}   