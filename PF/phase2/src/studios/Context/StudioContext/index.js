
import {createContext, useState} from "react";

export const useAPIContextStudios = () => {
    const [studios, setStudios] = useState([]);

    return {
        studios,
        setStudios,
    }
}

const APIContext = createContext({
    studios: null, setStudios: () => {},
})

export default APIContext;