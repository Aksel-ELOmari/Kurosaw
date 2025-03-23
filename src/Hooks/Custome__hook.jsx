import { useEffect,useState } from "react";
export const UseFetch = (api) =>{
    const [data,setData] = useState([]);
    const [errors,setErrors] = useState([]);

    useEffect(()=>{
        fetch(api)
        .then(response => response.json())
        .then(res => setData(res))
        .catch(error => setErrors(error))
    },[])

    return {data,errors}
}

