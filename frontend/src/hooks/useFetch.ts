import { useState } from 'react';

export const useFetch = () => {

    const [data, setData] = useState(null);

    const makeRequest = async (url: string, options = {}) => {
        const response = await fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setData(data);
                return data;
            });
            
        return response;
    };

    return { data, makeRequest };
}