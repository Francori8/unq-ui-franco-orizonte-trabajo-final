import axios from "axios";
import { BASE_URL } from "../utils/const";

export const getQuestion = async (difficulty: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/questions?difficulty=${difficulty}`);    
        return response.data;    
    } catch (error) {
        console.log(error);
    }
}   