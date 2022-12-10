import {createContext, useState} from "react";

export const useSubAPIContext = () => {
    const [payments, setPayments] = useState([]);

    const [card, setCard] = useState([]);

    const [subscribed, setSubscribed] = useState(true);

    const [subplans, setSubplans] = useState([]);

    const [change, setChange] = useState(true);

    const [userPlan, setUserPlan] = useState([]);

    const [updatePlan, setUpdatePlan] = useState({update: false, id: null})

    const [showPlanModal, setShowPlanModal] = useState({show: false, error: null})
    
    const [showCardModal, setShowCardModal] = useState(false)

    return {
        payments,
        setPayments,
        card,
        setCard,
        subplans,
        setSubplans,
        updatePlan,
        setUpdatePlan,
        showPlanModal,
        setShowPlanModal,
        showCardModal,
        setShowCardModal,
        userPlan,
        setUserPlan,
        subscribed,
        setSubscribed,
        change,
        setChange
    }
}

const subAPIContext = createContext({
    payments: null, setPayments: () => {},
    card: null, setCard: () => {},
    subplans: null, setSubplans: () => {},
    updatePlan: null, setUpdatePlan: () => {},
    showPlanModal: null, setShowPlanModal: () => {},
    showCardModal: null, setShowCardModal: () => {},
    userPlan: null, setUserPlan: () => {},
    subscribed: null, setSubscribed: () => {},
    change: null, setChange: () => {},
})

export default subAPIContext;