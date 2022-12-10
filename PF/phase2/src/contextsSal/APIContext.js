import {createContext, useState} from "react";

export const useAPIContext = () => {
    const [attended, setAttended] = useState([]);
    const [open, setOpen] = useState(true);

    return {
        attended,
        setAttended,
        open,
        setOpen
    }
}

const APIContext = createContext({
    attended: null, setAttended: () => {},
    open: null, setOpen: () => {}
})

export default APIContext;