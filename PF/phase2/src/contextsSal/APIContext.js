import {createContext, useState} from "react";

export const useAPIContext = () => {
    const [attended, setAttended] = useState([]);

    return {
        attended,
        setAttended
    }
}

const APIContext = createContext({
    attended: null, setAttended: () => {},
})

export default APIContext;