import axios from "axios";

export const fetchDataAPI = () => 
    axios
        .get("http://jsonplaceholder.typicode.com/photos")
        .then(response => {
            return response;
        })
        .catch(error => {
           return error;
        })