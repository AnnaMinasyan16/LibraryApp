import { API_URL } from "../Constant/Api";

export const fetchBooks = async (searchText) => {
    try {
        const response = await fetch(`${API_URL}${searchText}`);
        const data = await response.json();
        const {docs} = data;
        return docs;
    } catch(error) {
        console.log(error); 
        throw error;  
    }
}

